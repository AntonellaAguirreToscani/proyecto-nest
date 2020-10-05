export class Producto{
    public producto :string;
    public precio : number;
    public descripcion : string;   

    public constructor(_producto: string,_precio: number,_desc: string){
        this.producto = _producto;
        this.precio = _precio;
        this.descripcion = _desc;
    }
    public getNombre():string{
        return this.producto;
    }
    public getPrecio():number{
        return this.precio;
    }
    public getDescripcion():string{
        return this.descripcion;
    }
}