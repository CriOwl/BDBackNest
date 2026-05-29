import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export enum EstadoProveedor {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}

export class CreateProveedorDto {
  @IsString()
  @IsNotEmpty()
  razonSocial: string;

  @IsString()
  @IsNotEmpty()
  ruc: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsString()
  @IsNotEmpty()
  ciudad: string;

  @IsEnum(EstadoProveedor)
  estado: EstadoProveedor;
}
