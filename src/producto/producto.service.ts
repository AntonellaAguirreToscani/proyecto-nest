import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

let productoslist: string = fs.readFileSync('C:/Users/atoscani/source/repos/proyecto-nest/cfp-demo/config/productos.txt', 'utf-8');
let productos : string[] = productoslist.split('\n');

let productosOk = [];
for(let i = 0; i< productos.length; i++){
    productosOk[i] = productos[i].split(',');
}

@Injectable()
export class ProductoService {
    private static readonly CANTIDAD_PRODUCTOS = 10;

    public getProducto(): any {
        let productos = [];
        for (let i = 0; i < ProductoService.CANTIDAD_PRODUCTOS; i++) {
            let producto = {
                'producto': productosOk[i][0],
                'precio': productosOk[i][1],
                'descripcion': productosOk[i][2]
            };
            productos.push(producto);
        }
        return productos;
    }
}
