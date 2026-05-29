import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export enum EstadoSucursal {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}

export class CreateSucursalDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsString()
  @IsNotEmpty()
  ciudad: string;

  @IsEnum(EstadoSucursal)
  estado: EstadoSucursal;
}
