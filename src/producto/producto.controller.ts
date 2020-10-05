import { Body, Controller, Param } from '@nestjs/common';
import { Get, Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Producto } from 'src/producto.model';
import { ProductoService } from './producto.service';

@Controller('productos')
export class ProductoController {
    constructor(private productoService: ProductoService) { }
    @Get()
    public getProductos(): Producto[] {
        return this.productoService.getProductos();
    }
    @Get(':id')
    public getProducto(@Param('id') idProducto) : Producto{
        let producto: string = idProducto.toLowerCase();
        return this.productoService.getProducto(producto);
    }
    @Post()
    agregarProducto(@Body() producto : Producto):void{
        this.productoService.agregar(producto);   
    }
}    
