function getCarts() {
    document.getElementById('cardHeader').innerHTML = '<h4>Carrito de compras</h4>'
    fetch("https://fakestoreapi.com/carts", {
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
                let listcarts = `
              <table class="table">
                  <thead>
                      <tr>
                      <th scope="col">#</th>
                      <th scope="col">cart ID</th>
                      <th scope="col">Product ID</th>
                      <th scope="col">Quantity</th>
                      </tr>
                  </thead>
                  <tbody>
      
          `
                response.body.forEach(cart => {
                    let prod1 = ""
                    let prod2 = ""
                    let prod3 = ""
                    if (cart.products[0].productId !== null) {
                        prod1 = cart.products[0].productId
                    }
                    if (cart.products.length > 1) {
                        prod2 = ", " + cart.products[1].productId
                    }
                    if (cart.products.length > 2) {
                        prod3 = ", " + cart.products[2].productId
                    }
                    let can1 = ""
                    let can2 = ""
                    let can3 = ""
                    if (cart.products[0].productId !== null) {
                        can1 = cart.products[0].quantity
                    }
                    if (cart.products.length > 1) {
                        can2 = ", " + cart.products[1].quantity
                    }
                    if (cart.products.length > 2) {
                        can3 = ", " + cart.products[2].quantity
                    }
                    listcarts = listcarts.concat(`
                      <tr>
                          <td>${cart.id}</td>
                          <td>${cart.userId}</td>
                          <td>${prod1}${prod2}${prod3}</td>
                          <td>${can1}${can2}${can3}</td>
                          <td><button type="button" class="btn btn-outline-info" onclick="showInfocart('${cart.id}')">View</button></td>
                      </tr>
                      `)

                });
                document.getElementById('info').innerHTML = listcarts
            }
            else {
                document.getElementById('info').innerHTML = '<h3>No se encontraron productos en el carrito</h3>'
            }
        })


}

function showInfocart(cartId) {
    fetch("https://fakestoreapi.com/carts/" + cartId, {
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
                showModalcart(response.body)
            }
            else {
                document.getElementById('info').innerHTML = '<h3>No se encontro el producto</h3>'
            }
        })
}

function showModalcart(cart) {
    let prod1 = ""
    let prod2 = ""
    let prod3 = ""
    if (cart.products[0].productId !== null) {
        prod1 = cart.products[0].productId
    }
    if (cart.products.length > 1) {
        prod2 = ", " + cart.products[1].productId
    }
    if (cart.products.length > 2) {
        prod3 = ", " + cart.products[2].productId
    }
    let can1 = ""
    let can2 = ""
    let can3 = ""
    if (cart.products[0].productId !== null) {
        can1 = cart.products[0].quantity
    }
    if (cart.products.length > 1) {
        can2 = ", " + cart.products[1].quantity
    }
    if (cart.products.length > 2) {
        can3 = ", " + cart.products[2].quantity
    }
    const modalcart = `
  <div class="modal fade" id="modalcart" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Show cart</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">cart Info</h5>
              <p class="card-text">Id de usuario:${cart.userId}</p>
              <p class="card-text">Producto :${prod1}${prod2}${prod3}</p>
              <p class="card-text">Quantity :${can1}${can2}${can3}</p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  `
    document.getElementById('showModal').innerHTML = modalcart
    const modal = new bootstrap.Modal(document.getElementById('modalcart'))
    modal.show()
}   