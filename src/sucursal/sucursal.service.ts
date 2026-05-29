import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sucursal } from './entities/sucursal.entity';
import { CreateSucursalDto } from './dto/create-sucursal.dto';
import { UpdateSucursalDto } from './dto/update-sucursal.dto';
import { QueryDto } from '../common/dto/query.dto';

@Injectable()
export class SucursalService {
  constructor(
    @InjectRepository(Sucursal)
    private readonly sucursalRepository: Repository<Sucursal>,
  ) {}

  async create(createSucursalDto: CreateSucursalDto): Promise<Sucursal> {
    const sucursal = this.sucursalRepository.create(createSucursalDto);
    return await this.sucursalRepository.save(sucursal);
  }

  async findAll(queryDto: QueryDto): Promise<Sucursal[]> {
    const { limit = 10, offset = 0 } = queryDto;
    return await this.sucursalRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number): Promise<Sucursal> {
    const sucursal = await this.sucursalRepository.findOneBy({ id });
    if (!sucursal) {
      throw new NotFoundException(`Sucursal con id ${id} no encontrada`);
    }
    return sucursal;
  }

  async update(id: number, updateSucursalDto: UpdateSucursalDto): Promise<Sucursal> {
    const sucursal = await this.findOne(id);
    this.sucursalRepository.merge(sucursal, updateSucursalDto);
    return await this.sucursalRepository.save(sucursal);
  }

  async remove(id: number): Promise<void> {
    const sucursal = await this.findOne(id);
    await this.sucursalRepository.remove(sucursal);
  }
}
