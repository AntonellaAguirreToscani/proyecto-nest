import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { stringify } from 'querystring';
import { Producto } from 'src/producto.model';

@Injectable()
export class ProductoService {
    private listaProductos: Producto[]

    public constructor() {
        this.listaProductos = this.loadProductos();
    }
    //Metodo que carga los Productos del archivo.csv
    private loadProductos(): Producto[] {
        let archivo = fs.readFileSync('C:/Users/atoscani/source/repos/proyecto-nest/cfp-demo/config/productos.csv', 'utf8');

        const elementos: string[][] =
            archivo.split('\n').map(item => item.replace('\r', '')).map(item => item.split(','));

        let listaProductos = [];
        for (let i = 0; i < elementos.length; i++) {
            let producto = new Producto(elementos[i][0], parseInt(elementos[i][1]), elementos[i][2]);
            listaProductos.push(producto);
        }
        return listaProductos;
    }
    public getProductos(): Producto[] {
        return this.listaProductos;
    }

    public getProducto(id: string): Producto {
        let producto: Producto;
        this.listaProductos.forEach(item => {
            if (item.producto === id) {
                producto = item;
            }
        });
        return producto;
    }

    public agregar(prod: Producto) {
        const producto: Producto = new Producto(prod.producto, prod.precio, prod.descripcion);
        try {
            fs.appendFileSync('config/productos.csv',
                `${'\n'}${producto.getNombre()},${producto.getPrecio()},${producto.getDescripcion()}`
            );
        } catch (error) {
            console.log('Error Append');
        }
    }
}

