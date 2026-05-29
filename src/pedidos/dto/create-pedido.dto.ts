import { IsString, IsNotEmpty, IsNumber, IsEnum, IsOptional, IsDateString } from 'class-validator';

export enum EstadoPedido {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}

export class CreatePedidoDto {
  @IsOptional()
  @IsDateString()
  fecha?: string;

  @IsOptional()
  @IsNumber()
  total?: number;

  @IsString()
  @IsNotEmpty()
  formaPago: string;

  @IsNumber()
  @IsNotEmpty()
  clienteId: number;

  @IsNumber()
  @IsNotEmpty()
  empleadoId: number;

  @IsEnum(EstadoPedido)
  estado: EstadoPedido;
}
