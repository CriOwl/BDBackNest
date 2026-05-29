import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { QueryDto } from '../common/dto/query.dto';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
  ) {}

  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const pedido = this.pedidoRepository.create(createPedidoDto);
    return await this.pedidoRepository.save(pedido);
  }

  async findAll(queryDto: QueryDto): Promise<Pedido[]> {
    const { limit = 10, offset = 0 } = queryDto;
    return await this.pedidoRepository.find({
      take: limit,
      skip: offset,
      relations: {
        cliente: true,
        empleado: true,
      },
    });
  }

  async findOne(id: number, clienteId: number): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({
      where: { id, clienteId },
      relations: {
        cliente: true,
        empleado: true,
        detalles: true,
      },
    });
    if (!pedido) {
      throw new NotFoundException(`Pedido con id ${id} y clienteId ${clienteId} no encontrado`);
    }
    return pedido;
  }

  async update(id: number, clienteId: number, updatePedidoDto: UpdatePedidoDto): Promise<Pedido> {
    const pedido = await this.findOne(id, clienteId);
    this.pedidoRepository.merge(pedido, updatePedidoDto);
    return await this.pedidoRepository.save(pedido);
  }

  async remove(id: number, clienteId: number): Promise<void> {
    const pedido = await this.findOne(id, clienteId);
    await this.pedidoRepository.remove(pedido);
  }
}
