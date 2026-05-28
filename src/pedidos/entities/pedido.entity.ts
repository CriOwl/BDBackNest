import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Empleado } from '../../empleados/entities/empleado.entity';
import { Producto } from '../../productos/entities/producto.entity';

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column('decimal', { precision: 12, scale: 2 })
  total: number;

  @Column({ name: 'forma_pago' })
  formaPago: string;

  @Column()
  cantidad: number;

  @Column({ name: 'cliente_id' })
  clienteId: number;

  @Column({ name: 'empleado_id' })
  empleadoId: number;

  @Column({ name: 'producto_id' })
  productoId: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.pedidos)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @ManyToOne(() => Empleado, (empleado) => empleado.pedidos)
  @JoinColumn({ name: 'empleado_id' })
  empleado: Empleado;

  @ManyToOne(() => Producto, (producto) => producto.pedidos)
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;
}
