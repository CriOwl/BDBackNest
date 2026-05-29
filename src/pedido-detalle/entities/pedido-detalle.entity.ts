import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { Producto } from 'src/productos/entities/producto.entity';

@Entity('pedido_detalle')
export class PedidoDetalle {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ name: 'cliente_id' })
  clienteId: number;

  @Column({ name: 'pedido_id' })
  pedidoId: number;

  @Column({ name: 'producto_id' })
  productoId: number;

  @Column()
  cantidad: number;

  @Column('decimal', { name: 'precio_unitario', precision: 10, scale: 2 })
  precioUnitario: number;

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

  @ManyToOne(() => Pedido, (pedido) => pedido.detalles, { onDelete: 'CASCADE' })
  @JoinColumn([
    { name: 'pedido_id', referencedColumnName: 'id' },
    { name: 'cliente_id', referencedColumnName: 'clienteId' },
  ])
  pedido: Pedido;

  @ManyToOne(() => Producto, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;
}
