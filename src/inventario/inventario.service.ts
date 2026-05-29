import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Inventario } from './entities/inventario.entity';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { QueryDto } from '../common/dto/query.dto';

@Injectable()
export class InventarioService {
  constructor(
    @InjectRepository(Inventario)
    private readonly inventarioRepository: Repository<Inventario>,
  ) {}

  async create(createInventarioDto: CreateInventarioDto): Promise<Inventario> {
    const { producto_id, sucursal_id, ...inventarioDto } = createInventarioDto;
    const inventarioData: DeepPartial<Inventario> = {
      ...inventarioDto,
      producto: { id: producto_id },
      sucursal: { id: sucursal_id },
    };
    const inventario = this.inventarioRepository.create(inventarioData);
    return await this.inventarioRepository.save(inventario);
  }

  async findAll(queryDto: QueryDto): Promise<Inventario[]> {
    const { limit = 10, offset = 0 } = queryDto;
    return await this.inventarioRepository.find({
      take: limit,
      skip: offset,
      relations: {
        producto: true,
        sucursal: true,
      },
    });
  }

  async findOne(id: number): Promise<Inventario> {
    const inventario = await this.inventarioRepository.findOne({
      where: { id },
      relations: {
        producto: true,
        sucursal: true,
      },
    });
    if (!inventario) {
      throw new NotFoundException(`Inventario con id ${id} no encontrado`);
    }
    return inventario;
  }

  async update(id: number, updateInventarioDto: UpdateInventarioDto): Promise<Inventario> {
    const inventario = await this.findOne(id);
    const { producto_id, sucursal_id, ...inventarioDto } = updateInventarioDto;
    const inventarioData: DeepPartial<Inventario> = { ...inventarioDto };

    if (producto_id !== undefined) {
      inventarioData.producto = { id: producto_id };
    }

    if (sucursal_id !== undefined) {
      inventarioData.sucursal = { id: sucursal_id };
    }

    this.inventarioRepository.merge(inventario, inventarioData);
    return await this.inventarioRepository.save(inventario);
  }

  async remove(id: number): Promise<void> {
    const inventario = await this.findOne(id);
    await this.inventarioRepository.remove(inventario);
  }
}
