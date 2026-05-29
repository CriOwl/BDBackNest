import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';

@Entity('proveedores')
export class Proveedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'razon_social' })
  razonSocial: string;

  @Column()
  ruc: string;
  @Column()
  direccion: string;

  
  @Column()
  ciudad: string;
  
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

  @OneToMany(() => Producto, (producto) => producto.proveedor)
  productos: Producto[];
}
