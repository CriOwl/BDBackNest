import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export enum Estado {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}

export class CreateCatalogoDto {

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsEnum(Estado)
  estado: Estado;
}