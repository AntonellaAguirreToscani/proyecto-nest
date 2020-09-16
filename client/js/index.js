let btnAgregar = document.querySelector("#btnAgregar");
btnAgregar.addEventListener("click", agregar);

let btnTotal = document.querySelector("#btnTotal");
btnTotal.addEventListener("click", sumar);

let compras = [];

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
function mostrarTablaCompras() {
    html = "";
    compras.forEach(item=>{
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

    compras.forEach(item=>{
        total+= item.precio;

        if(item.precio > max)
            max = item.precio;
    });
    document.querySelector("#total").innerHTML =
        "<p>Total: $" + total + "</p>" +
        "<p>Maximo: $" + max + "</p>"
}
