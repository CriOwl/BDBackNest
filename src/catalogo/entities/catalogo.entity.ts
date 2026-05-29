import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { Persona } from '../../persona/entities/persona.entity';
import { Sucursal } from 'src/sucursal/entities/sucursal.entity';
import { Producto } from 'src/productos/entities/producto.entity';

@Entity('catalogo')
export class Catalogo {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column({
    type: 'varchar',
    enum: ['activo', 'inactivo'],
  })
  estado: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha_creacion: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha_modificacion: Date;

  @OneToMany(() => Persona, (persona) => persona.catalogo)
  personas: Persona[];

  @OneToMany(() => Producto, (producto) => producto.catalogos)
  productos: Producto[];


}