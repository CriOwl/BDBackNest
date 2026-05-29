import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Empleado } from '../../empleados/entities/empleado.entity';
import { Producto } from '../../productos/entities/producto.entity';
import { Persona } from 'src/persona/entities/persona.entity';
import { Inventario } from 'src/inventario/entities/inventario.entity';

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
  
  @Column({ name: 'person_id' })
  empleadoId: number;

  @Column({ name: 'producto_id' })
  productoId: number;

  @ManyToOne(() => Persona, (persona) => persona.pedidos)
  @JoinColumn({ name: 'person_id' })
  persona: Persona;

  @ManyToOne(() => Empleado, (empleado) => empleado.pedidos)
  @JoinColumn({ name: 'empleado_id' })
  empleado: Empleado;

  @ManyToOne(() => Producto, (producto) => producto.pedidos)
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;

}
