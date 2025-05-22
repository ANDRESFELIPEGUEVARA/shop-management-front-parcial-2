function getProducts() {
  document.getElementById('cardHeader').innerHTML = '<h4>Listado de productos</h4>'
  document.getElementById('info').innerHTML = ''
  fetch("https://fakestoreapi.com/products", {
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
                      <th scope="col">title</th>
                      <th scope="col">precio</th>
                      <th scope="col">descripcion</th>
                      <th scope="col">categoria</th>
                      <th scope="col">imagen</th>
                      </tr>
                  </thead>
                  <tbody>
          `
              response.body.forEach(product => {
                  listProducts = listProducts.concat(`
                  <tr>
                      <td>${product.id}</td>
                      <td>${product.title}</td>
                      <td>${product.price}</td>
                      <td>${product.description}</td>
                      <td>${product.category}</td>
                      <td><img src="${product.image}" class="img-thumbnail" alt="Imagen de pruductos"></td>
                      <td><button type="button" class="btn btn-outline-info" onclick="showInfoProducts('${product.id}')">View</button></td>

                  </tr>
                  `)
              })
              document.getElementById("info").innerHTML = listProducts

          }
      }))

}
function showInfoProducts(productId) {
  fetch("https://fakestoreapi.com/products/" + productId, {
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

      .then((response) => {
          if (response.status === 200) {
              showModalProducts(response.body)
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
            <img src="${product.image}" class="card-img-top" alt="imagen producto">
            <div class="card-body">
              <h5 class="card-title">Product Info</h5>
              <p class="card-text">Titulo :${product.title}</p>
              <p class="card-text">Description :${product.description}</p>
              <p class="card-text">categoria:${product.category}</p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secundary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  `
  document.getElementById('showModal').innerHTML=modalProduct
  const modal=new bootstrap.Modal(document.getElementById('modalProduct'))
  modal.show()
}   