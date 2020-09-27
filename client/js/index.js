let btnAgregar = document.querySelector("#btnAgregar");
btnAgregar.addEventListener("click", function () {
    let input1 = document.querySelector('#producto').value;
    let input2 = document.querySelector('#precio').value;
    (input1 === "" && input2 === "") ? load() : agregar(); // Carga el mock.json o lo que se le pase por Inputs!
});

let btnTotal = document.querySelector("#btnTotal");
btnTotal.addEventListener("click", sumar);

let compras = [];
//Metodo que permite agregar productos de manera Manual
async function agregar() {
    console.log("Funcion Agregar");
    let producto = document.querySelector('#producto').value;
    let precio = parseInt(document.querySelector('#precio').value);
    let descripcion = document.querySelector('#descripcion').value;

    let renglon = {
        "producto": producto,
        "precio": precio,
        "descripcion": descripcion
    }
    try {
        if (renglon.producto != '' && renglon.precio > 0 && renglon.descripcion != '') {
            let respuesta = await fetch('http://localhost:3000/productos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Define que la app va a recibir un json
                },
                body: JSON.stringify(renglon) //Convierte el obj en json
            });
    
            if (respuesta.ok) {
                compras.push(renglon);
                mostrarTablaCompras(compras);
            }else{
                throw Error('Invalid Response');
            }

        }else{
            throw Error('Parámetro/s Invalido/s');
        }
    } catch (error) {
        console.log(error);
    }   
}
async function mostrarTablaCompras(array) {
    html = "";
    await array.forEach(item => {
        html += `
        <tr>
            <td>${item.producto}</td>
            <td>${item.precio}</td>
            <td>${item.descripcion}</td>
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
//metodo que llena la tabla con una compra Mockeada!
async function load() {
    let mensaje = document.querySelector("#tblCompras");
    mensaje.innerHTML = "<h1>......................Loading!</h1>";

    try {
        let response = await fetch('/productos')
        if (response.ok) {
            let compraMock = await response.json();

            mensaje.innerHTML = mostrarTablaCompras(compraMock);
        } else {
            mensaje.innerHTML = "<h1>Error...Failed URL!</h1>"
        }
    } catch (response) {
        mensaje.innerHTML = "<h1>Conection Error!</h1>"
    }

    //-------OTRA MANERA DE TRAER LA PROMESA Y OBTENER DE ELLA LO NECESARIO---------
    // let comprasMock = {};
    // await fetch('http://localhost:3000/mock.json')
    //     .then(response => response.json()) //Parseando a obj
    //     .then(data => {                   // en base al obj ya parseado se toma el contenido: data
    //         comprasMock = data.compra;   // se guarda en comprasMock Solo el arreglo de compras{} del mock.json!
    //     });

    // return comprasMock;
}