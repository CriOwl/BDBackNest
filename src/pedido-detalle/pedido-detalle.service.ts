import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PedidoDetalle } from './entities/pedido-detalle.entity';
import { CreatePedidoDetalleDto } from './dto/create-pedido-detalle.dto';
import { UpdatePedidoDetalleDto } from './dto/update-pedido-detalle.dto';
import { QueryDto } from '../common/dto/query.dto';

@Injectable()
export class PedidoDetalleService {
  constructor(
    @InjectRepository(PedidoDetalle)
    private readonly pedidoDetalleRepository: Repository<PedidoDetalle>,
  ) {}

  async create(createPedidoDetalleDto: CreatePedidoDetalleDto): Promise<PedidoDetalle> {
    const detalle = this.pedidoDetalleRepository.create(createPedidoDetalleDto);
    return await this.pedidoDetalleRepository.save(detalle);
  }

  async findAll(queryDto: QueryDto): Promise<PedidoDetalle[]> {
    const { limit = 10, offset = 0 } = queryDto;
    return await this.pedidoDetalleRepository.find({
      take: limit,
      skip: offset,
      relations: {
        producto: true,
      },
    });
  }

  async findOne(id: number, clienteId: number): Promise<PedidoDetalle> {
    const detalle = await this.pedidoDetalleRepository.findOne({
      where: { id, clienteId },
      relations: {
        producto: true,
      },
    });
    if (!detalle) {
      throw new NotFoundException(`Detalle de pedido con id ${id} y clienteId ${clienteId} no encontrado`);
    }
    return detalle;
  }

  async update(id: number, clienteId: number, updatePedidoDetalleDto: UpdatePedidoDetalleDto): Promise<PedidoDetalle> {
    const detalle = await this.findOne(id, clienteId);
    this.pedidoDetalleRepository.merge(detalle, updatePedidoDetalleDto);
    return await this.pedidoDetalleRepository.save(detalle);
  }

  async remove(id: number, clienteId: number): Promise<void> {
    const detalle = await this.findOne(id, clienteId);
    await this.pedidoDetalleRepository.remove(detalle);
  }
}
