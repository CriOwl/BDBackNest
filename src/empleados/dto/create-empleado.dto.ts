import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateEmpleadoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  puesto: string;

  @IsDateString()
  @IsNotEmpty()
  fechaContrato: string;
}
