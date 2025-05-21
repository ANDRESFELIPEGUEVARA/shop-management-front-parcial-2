function getProducts(page) {
    document.getElementById('cardHeader').innerHTML = '<h4>Listado de productos</h4>'
    document.getElementById('info').innerHTML = ''
    fetch("https://reqres.in/api/unknown?page="+page, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },

    })
        .then((result) => {
            return result.json().then(
                data => {
                    return {
                        status: result.status,
                        body: data
                    }
                }
            )
        })

        .then((response => {
            if (response.status === 200) {
                listProducts = `
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">name</th>
                        <th scope="col">year</th>
                        <th scope="col">color</th>
                        <th scope="col">pantone</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
            `
                response.body.data.forEach(product => {
                    listProducts = listProducts.concat(`
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.year}</td>
                        <td><input type="color" value="${product.color}"></td>
                        <td>${product.pantone_value}</td>
                        <td><button type="button" class="btn btn-outline-info" onclick="showInfoProducts('${product.id}')">View</button></td>

                    </tr>
                    `)
                })
                listProducts = listProducts.concat(`
                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                  <ul class="pagination justify-content-center">
                    <li class="page-item">
                      <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                      </a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#" onclick="getProducts('1')"">1</a></li>
                    <li class="page-item"><a class="page-link" href="#" onclick="getProducts('2')">2</a></li>
                    <li class="page-item">
                      <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                    </li>
                  </ul>
                </nav>
                `)

                document.getElementById("info").innerHTML = listProducts

            }
        }))

}
function showInfoProducts(productId) {
    fetch("https://reqres.in/api/unknown/" + productId, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            'x-api-key': 'reqres-free-v1'
        },
    })
        .then((result) => {
            return result.json().then(
                data => {
                    return {
                        status: result.status,
                        body: data
                    }
                }
            )
        })

        .then((response) => {
            if (response.status === 200) {
                showModalProducts(response.body.data)
            }
            else {
                document.getElementById('info').innerHTML = '<h3>No se encontro el producto</h3>'
            }
        })
}

function showModalProducts(product){
    const modalProduct=`
    <div class="modal fade" id="modalProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Show Product</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="card">
              <input class="card-img-top" type="color" value=${product.color}>
              <div class="card-body">
                <h5 class="card-title">Product Info</h5>
                <p class="card-text">Name :${product.name}</p>
                <p class="card-text">Year :${product.year}</p>
                <p class="card-text">pantone value :${product.pantone_value}</p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secundary" style="background-color:${product.color}" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    `
    document.getElementById('showModal').innerHTML=modalProduct
    const modal=new bootstrap.Modal(document.getElementById('modalProduct'))
    modal.show()
}   

