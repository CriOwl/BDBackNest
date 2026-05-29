import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Persona } from './entities/persona.entity';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { QueryDto } from '../common/dto/query.dto';

@Injectable()
export class PersonaService {
  constructor(
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) {}

  async create(createPersonaDto: CreatePersonaDto): Promise<Persona> {
    const persona = this.personaRepository.create({ ...createPersonaDto, catalogo: { id: createPersonaDto.catalogoId } });
    return await this.personaRepository.save(persona);
  }

  async findAll(queryDto: QueryDto): Promise<Persona[]> {
    const { limit = 10, offset = 0 } = queryDto;
    return await this.personaRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number): Promise<Persona> {
    const persona = await this.personaRepository.findOneBy({ id });
    if (!persona) {
      throw new NotFoundException(`Persona con id ${id} no encontrada`);
    }
    return persona;
  }

  async update(id: number, updatePersonaDto: UpdatePersonaDto): Promise<Persona> {
  const persona = await this.findOne(id);

  const { catalogoId, ...rest } = updatePersonaDto;

  const updated = {
    ...rest,
    ...(catalogoId && { catalogo: { id: catalogoId } }),
  };

  this.personaRepository.merge(persona, updated);

  return await this.personaRepository.save(persona);
}

  async remove(id: number): Promise<void> {
    const persona = await this.findOne(id);
    await this.personaRepository.remove(persona);
  }
}
