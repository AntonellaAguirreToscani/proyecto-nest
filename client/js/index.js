let btnAgregar = document.querySelector("#btnAgregar");
btnAgregar.addEventListener("click", cargarCompraMock);

let btnTotal = document.querySelector("#btnTotal");
btnTotal.addEventListener("click", sumar);

let compras = [];
//Metodo que permite agregar productos de manera Manual
function agregar() {
    console.log("Funcion Agregar");

    let producto = document.querySelector('#producto').value;
    let precio = parseInt(document.querySelector('#precio').value);

    let renglon = {
        "producto": producto,
        "precio": precio
    }
    compras.push(renglon);

    mostrarTablaCompras();

}
// metodo que muestra las compras que se cargan por la app(manualmente).
function mostrarTablaCompras() {
    html = "";
    compras.forEach(item => {
        html += `
        <tr>
            <td>${item.producto}</td>
            <td>${item.precio}</td>
        </tr>
         `;
    });
    document.querySelector("#tblCompras").innerHTML = html;
}

function sumar() {
    console.log("Funcion Sumar");

    let total = 0;
    let max = 0;

    compras.forEach(item => {
        total += item.precio;

        if (item.precio > max)
            max = item.precio;
    });
    document.querySelector("#total").innerHTML =
        "<p>Total: $" + total + "</p>" +
        "<p>Maximo: $" + max + "</p>"
}

// metodo que imprime las compras Mockeadas
async function cargarCompraMock() {
    let compraMockeada = await load();

    let html = "";
    compraMockeada.forEach(item => {
        html += `
        <tr>
            <td>${item.producto}</td>
            <td>${item.precio}</td>
        </tr>
     `;
    });

    document.querySelector("#tblCompras").innerHTML = html;
}
//Carga la API Mockeada y retorna lo que se necesita del Json: compra
async function load() {
    let mensaje = document.querySelector("#tblCompras");
    mensaje.innerHTML =  "<h1>......................Loading!</h1>";

    try {
        let response = await fetch('http://localhost:3000/mock.json')
            if (response.ok){
                let compraMock = await response.json();
                return  compraMock.compra;
            }else{
                mensaje.innerHTML = "<h1>Error...Failed URL!</h1>"
            }
    } catch (response) {
        mensaje.innerHTML = "<h1>Conection Error!</h1>"
    }
    
    //-------OTRA MANERA DE HACER LO MISMO---------
    // let comprasMock = {};
    // await fetch('http://localhost:3000/mock.json')
    //     .then(response => response.json()) //Parseando a obj
    //     .then(data => {                   // en base al obj ya parseado se toma el contenido: data
    //         comprasMock = data.compra;   // se guarda en comprasMock Solo el arreglo de compras{} del mock.json!
    //     });

    // return comprasMock;
}