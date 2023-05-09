
let datos

let b;

let tablaclientes = ''

fetch('http://localhost:4005/clientes')
  .then(response => response.json())
  .then(data => {
    datos = data
    init()
})
.catch(error => console.log(error))



const config = {
    headers: new Headers({
      "Content-Type": "application/json"
    }),
}


const searchUser = async(data)=>{
    config.method = "GET";
    let res = await ( await fetch(`http://localhost:4005/clientes?q=${Object.values(data).join("")}`,config)).json();
    
}

function init() {
    
    datos.forEach(data => {
        tablaclientes += `
        <tr data-id="${data.id}">
            <th scope="row">${b.identificacion}</th>
            <td>${b.nombre}</td>
            <td>${b.apellido}</td>
            <td>${b.telefono}</td> 
            <td>${b.fechaNacimiento}</td>
            <td>${b.ciudadOrigen}</td>
            <td>${b.correo}</td>
            <td>
                <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalClientes">Editar</button>
                <button type="button" class="btn btn-danger">X</button>
            </td>
        </tr>
        `
      })
    
    let tablatitulo = document.querySelector("#tablatitulo")
    tablatitulo.insertAdjacentHTML("afterend", tablaclientes)

    let myForm = document.querySelector("#myForm")

    myForm.addEventListener("submit",(e) => {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target))
        searchUser(data)
    })


}