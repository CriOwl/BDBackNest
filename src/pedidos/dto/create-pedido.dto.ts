import { IsString, IsNotEmpty, IsNumber, IsPositive, IsDateString } from 'class-validator';

export class CreatePedidoDto {
  @IsDateString()
  @IsNotEmpty()
  fecha: string;

  @IsNumber()
  @IsPositive()
  total: number;

  @IsString()
  @IsNotEmpty()
  formaPago: string;

  @IsNumber()
  @IsPositive()
  cantidad: number;

  @IsNumber()
  @IsNotEmpty()
  clienteId: number;

  @IsNumber()
  @IsNotEmpty()
  empleadoId: number;

  @IsNumber()
  @IsNotEmpty()
  productoId: number;
}
