import { IsNumber, IsNotEmpty, IsPositive, IsEnum, Min } from 'class-validator';

export enum EstadoDetalle {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}

export class CreatePedidoDetalleDto {
  @IsNumber()
  @IsNotEmpty()
  clienteId: number;

  @IsNumber()
  @IsNotEmpty()
  pedidoId: number;

  @IsNumber()
  @IsNotEmpty()
  productoId: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  cantidad: number;

  @IsNumber()
  @IsPositive()
  precioUnitario: number;

  @IsEnum(EstadoDetalle)
  estado: EstadoDetalle;
}
