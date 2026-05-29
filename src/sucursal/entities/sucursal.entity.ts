import {Inventario} from '../../inventario/entities/inventario.entity';
import {PrimaryGeneratedColumn, Column, OneToMany, Entity} from "typeorm";

@Entity('sucursal')

export class Sucursal {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

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

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    fecha_modificacion: Date;

    @OneToMany(() => Inventario, (inventario) => inventario.sucursal)
    inventarios: Inventario[];
}
