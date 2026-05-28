import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Proveedor } from '../../proveedores/entities/proveedor.entity';
import { Pedido } from '../../pedidos/entities/pedido.entity';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column({ name: 'proveedor_id' })
  proveedorId: number;

  @ManyToOne(() => Proveedor, (proveedor) => proveedor.productos)
  @JoinColumn({ name: 'proveedor_id' })
  proveedor: Proveedor;

  @OneToMany(() => Pedido, (pedido) => pedido.producto)
  pedidos: Pedido[];
}
