import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { ProductoService } from './producto.service';

@Controller('producto')
export class ProductoController {
    constructor(private productoService: ProductoService) { }
    @Get()
    public getProducto(): string {
        return this.productoService.getProducto()
    }
}
