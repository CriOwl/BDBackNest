import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Proveedor } from '../../proveedores/entities/proveedor.entity';
import { Pedido } from '../../pedidos/entities/pedido.entity';
import { Inventario } from 'src/inventario/entities/inventario.entity';
import { Catalogo } from 'src/catalogo/entities/catalogo.entity';

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

  @ManyToOne(() => Proveedor, (proveedor) => proveedor.productos)
  @JoinColumn({ name: 'proveedor_id' })
  proveedor: Proveedor;

  @ManyToOne(() => Catalogo, (catalogo) => catalogo.productos)
  @JoinColumn({ name: 'id_categoria' })
  catalogos: Catalogo;

  @OneToMany(() => Pedido, (pedido) => pedido.producto)
  pedidos: Pedido[];

  @OneToMany(() => Inventario, (inventario) => inventario.producto)
  inventarios: Inventario[];


}
