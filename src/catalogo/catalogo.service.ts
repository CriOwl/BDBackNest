import { Injectable } from '@nestjs/common';
import { CreateCatalogoDto } from './dto/create-catalogo.dto';
import { UpdateCatalogoDto } from './dto/update-catalogo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Catalogo } from './entities/catalogo.entity';

@Injectable()
export class CatalogoService {
   constructor(
      @InjectRepository(Catalogo)
      private readonly catalogoRepository: Repository<Catalogo>,
    ) {}

  create(createCatalogoDto: CreateCatalogoDto) {
    return this.catalogoRepository.save(createCatalogoDto);
  }

  findAll() {
    return this.catalogoRepository.find();
  }

  findOne(id: number) {
    return this.catalogoRepository.findOne({ where: { id } });
  }

  update(id: number, updateCatalogoDto: UpdateCatalogoDto) {
    return this.catalogoRepository.update(id, updateCatalogoDto);
  }

  remove(id: number) {
    return this.catalogoRepository.delete(id);
  }
}
