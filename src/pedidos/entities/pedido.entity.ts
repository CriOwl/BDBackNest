import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Persona } from '../../persona/entities/persona.entity';
import { PedidoDetalle } from '../../pedido-detalle/entities/pedido-detalle.entity';

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ name: 'cliente_id' })
  clienteId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column('decimal', { precision: 12, scale: 2, default: 0.00 })
  total: number;

  @Column({ name: 'forma_pago' })
  formaPago: string;

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

  @Column({ name: 'empleado_id' })
  empleadoId: number;

  @ManyToOne(() => Persona, (persona) => persona.pedidosComoCliente, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'cliente_id', referencedColumnName: 'id' })
  cliente: Persona;

  @ManyToOne(() => Persona, (persona) => persona.pedidosComoEmpleado, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'empleado_id', referencedColumnName: 'id' })
  empleado: Persona;

  @OneToMany(() => PedidoDetalle, (detalle) => detalle.pedido)
  detalles: PedidoDetalle[];
}
