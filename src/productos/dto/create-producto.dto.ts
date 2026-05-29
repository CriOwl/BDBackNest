import { IsString, IsNotEmpty, IsNumber, IsPositive, IsEnum } from 'class-validator';

export enum EstadoProducto {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  @IsPositive()
  precio: number;

  @IsNumber()
  @IsNotEmpty()
  proveedorId: number;

  @IsNumber()
  @IsNotEmpty()
  catalogo: number;

  @IsEnum(EstadoProducto)
  estado: EstadoProducto;
}
