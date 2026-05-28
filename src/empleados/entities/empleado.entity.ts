import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pedido } from '../../pedidos/entities/pedido.entity';

@Entity('empleados')
export class Empleado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  puesto: string;

  @Column({ name: 'fecha_contrato', type: 'date' })
  fechaContrato: Date;

  @OneToMany(() => Pedido, (pedido) => pedido.empleado)
  pedidos: Pedido[];
}
