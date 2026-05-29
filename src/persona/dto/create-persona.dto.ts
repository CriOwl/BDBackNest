import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';

export enum Estado {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}
export class CreatePersonaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsString()
  @IsNotEmpty()
  cedula: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsString()
  @IsNotEmpty()
  ciudad: string;

  @IsNumber()
  @IsNotEmpty()
  catalogoId: number;

   @IsEnum(Estado)
    estado: Estado;
}
