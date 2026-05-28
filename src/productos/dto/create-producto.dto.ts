import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

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
}
