import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empleado } from './entities/empleado.entity';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { QueryDto } from '../common/dto/query.dto';

@Injectable()
export class EmpleadosService {
  constructor(
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,
  ) {}

  async create(createEmpleadoDto: CreateEmpleadoDto): Promise<Empleado> {
    const empleado = this.empleadoRepository.create(createEmpleadoDto);
    return await this.empleadoRepository.save(empleado);
  }

  async findAll(queryDto: QueryDto): Promise<Empleado[]> {
    const { limit = 10, offset = 0 } = queryDto;
    return await this.empleadoRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number): Promise<Empleado> {
    const empleado = await this.empleadoRepository.findOneBy({ id });
    if (!empleado) {
      throw new NotFoundException(`Empleado con id ${id} no encontrado`);
    }
    return empleado;
  }

  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto): Promise<Empleado> {
    const empleado = await this.findOne(id);
    this.empleadoRepository.merge(empleado, updateEmpleadoDto);
    return await this.empleadoRepository.save(empleado);
  }

  async remove(id: number): Promise<void> {
    const empleado = await this.findOne(id);
    await this.empleadoRepository.remove(empleado);
  }
}
