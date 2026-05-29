import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { QueryDto } from '../common/dto/query.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const { proveedorId, catalogo, ...productoDto } = createProductoDto;
    const productoData: DeepPartial<Producto> = {
      ...productoDto,
      proveedor: { id: proveedorId },
      catalogos: { id: catalogo },
    };
    const producto = this.productoRepository.create(productoData);
    return await this.productoRepository.save(producto);
  }

  async findAll(queryDto: QueryDto): Promise<Producto[]> {
    const { limit = 10, offset = 0 } = queryDto;
    return await this.productoRepository.find({
      take: limit,
      skip: offset,
      relations: { proveedor: true, catalogos: true },
    });
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({
      where: { id },
      relations: { proveedor: true, catalogos: true },
    });
    if (!producto) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return producto;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto): Promise<Producto> {
    const producto = await this.findOne(id);
    const { proveedorId, catalogo, ...productoDto } = updateProductoDto;
    const productoData: DeepPartial<Producto> = { ...productoDto };

    if (proveedorId !== undefined) {
      productoData.proveedor = { id: proveedorId };
    }

    if (catalogo !== undefined) {
      productoData.catalogos = { id: catalogo };
    }

    this.productoRepository.merge(producto, productoData);
    return await this.productoRepository.save(producto);
  }

  async remove(id: number): Promise<void> {
    const producto = await this.findOne(id);
    await this.productoRepository.remove(producto);
  }
}
