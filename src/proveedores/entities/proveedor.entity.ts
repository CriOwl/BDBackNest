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

  @OneToMany(() => Producto, (producto) => producto.proveedor)
  productos: Producto[];
}
