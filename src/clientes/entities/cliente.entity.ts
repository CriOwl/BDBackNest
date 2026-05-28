import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pedido } from '../../pedidos/entities/pedido.entity';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  cedula: string;

  @Column()
  direccion: string;

  @Column()
  ciudad: string;

  @OneToMany(() => Pedido, (pedido) => pedido.cliente)
  pedidos: Pedido[];
}
