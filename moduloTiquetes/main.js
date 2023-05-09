let datos

let tablaclientes = ''

fetch('http://localhost:4005/rutas')
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


const postUser = async (data) => {
    config.method = "POST"
    config.body = JSON.stringify(data)
    let res = await (await fetch("http://localhost:4005/rutas", config)).json()
}

const deleteUser = async(id)=>{
    config.method = "DELETE"
    let res = await ( await fetch(`http://localhost:4005/rutas/${id}`,config)).json()
    console.log(res)
}

const putUser = async(data)=>{
    config.method = "PUT";
    config.body = JSON.stringify(data);
    let res = await ( await fetch(`ttp://localhost:4005/rutas/${id}`,config)).json();
}


function init() {

    datos.forEach(data => {
        tablaclientes += `
        <tr data-id="${data.id}">
            <td>${data.nombreRuta}</td>
            <td>${data.ciudadOrigen}</td>
            <td>${data.ciudadDestino}</td> 
            <td>${((((data.totalMillas*data.valorMilla)*0.5)+(data.totalMillas*data.valorMilla))*0.25)+(data.totalMillas*data.valorMilla)}</td>
            <td>
            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#comprar">Comprar</button>
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
        postUser(data)
    })

}