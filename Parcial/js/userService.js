function getUsers() {
    document.getElementById('cardHeader').innerHTML = '<h4>Listado de usuarios</h4>'
    fetch("https://fakestoreapi.com/users", {
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
                let listUsers = `
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">User name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Password</th>
                        </tr>
                    </thead>
                    <tbody>
        
            `
                response.body.forEach(user => {
                    listUsers=listUsers.concat(`
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.username}</td>
                            <td>${user.email}</td>
                            <td>${user.password}</td>
                            <td><button type="button" class="btn btn-outline-info" onclick="showInfoUser('${user.id}')">View</button></td>
                        </tr>
                        `)
                    
                });
                document.getElementById('info').innerHTML=listUsers    
            }
            else {
                document.getElementById('info').innerHTML = '<h3>No se encontraron usuarios</h3>'
            }
        })


}

function showInfoUser(userId){
    fetch("https://fakestoreapi.com/users/"+userId, {
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

    .then((response)=>{
        if(response.status=== 200){
            showModalUser(response.body)
        }
        else{
            document.getElementById('info').innerHTML='<h3>No se encontro el usuario</h3>'
        }
    })
}

function showModalUser(user){
    const modalUser=`
    <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Show User</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">User Info</h5>
                <p class="card-text">Nombre de usuario :${user.username}</p>
                <p class="card-text">Correo :${user.email}</p>
                <p class="card-text">Contraseña :${user.password}</p>
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
    document.getElementById('showModal').innerHTML=modalUser
    const modal=new bootstrap.Modal(document.getElementById('modalUser'))
    modal.show()
}   