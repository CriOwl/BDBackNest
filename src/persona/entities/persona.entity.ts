import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne, UpdateDateColumn } from 'typeorm';
import { Catalogo } from '../../catalogo/entities/catalogo.entity';
import { on } from 'events';
import { Pedido } from 'src/pedidos/entities/pedido.entity';

@Entity('persona')
export class Persona {

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

  @UpdateDateColumn({
    type: 'timestamp',
  })
  fecha_modificacion: Date;
  
  @ManyToOne(() => Catalogo, (catalogo) => catalogo.personas, {
  eager: true,
})
@JoinColumn({ name: 'id_rol' })
catalogo: Catalogo;

  @OneToMany(() => Pedido, (pedido) => pedido.persona)
  pedidos: Pedido[];
}
