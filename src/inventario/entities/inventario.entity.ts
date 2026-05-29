import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Producto } from '../../productos/entities/producto.entity';
import { Sucursal } from '../../sucursal/entities/sucursal.entity';

@Entity('inventario')
export class Inventario {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cantidad: number;

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

  @ManyToOne(() => Sucursal, (sucursal) => sucursal.inventarios)
  @JoinColumn({ name: 'id_sucursal' })
  sucursal: Sucursal;

  @ManyToOne(() => Producto, (producto) => producto.inventarios)
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;

}
