import { IsNumber, IsNotEmpty, IsEnum, Min } from 'class-validator';

export enum EstadoInventario {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}

export class CreateInventarioDto {
  @IsNumber()
  @Min(0)
  cantidad: number;

  @IsNumber()
  @IsNotEmpty()
  producto_id: number;

  @IsNumber()
  @IsNotEmpty()
  sucursal_id: number;

  @IsEnum(EstadoInventario)
  estado: EstadoInventario;
}
