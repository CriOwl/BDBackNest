import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Cliente } from './clientes/entities/cliente.entity';
import { Empleado } from './empleados/entities/empleado.entity';
import { Proveedor } from './proveedores/entities/proveedor.entity';
import { Producto } from './productos/entities/producto.entity';
import { Pedido } from './pedidos/entities/pedido.entity';
import { ClientesService } from './clientes/clientes.service';
import { ClientesController } from './clientes/clientes.controller';
import { EmpleadosService } from './empleados/empleados.service';
import { EmpleadosController } from './empleados/empleados.controller';
import { ProveedoresService } from './proveedores/proveedores.service';
import { ProveedoresController } from './proveedores/proveedores.controller';
import { ProductosService } from './productos/productos.service';
import { ProductosController } from './productos/productos.controller';
import { PedidosService } from './pedidos/pedidos.service';
import { PedidosController } from './pedidos/pedidos.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USER', 'app_user'),
        password: configService.get<string>('DB_PASSWORD', 'app_password'),
        database: configService.get<string>('DB_NAME', 'app_db'),
        entities: [Cliente, Empleado, Proveedor, Producto, Pedido],
        synchronize: true, // Solo para desarrollo
      }),
    }),
    TypeOrmModule.forFeature([Cliente, Empleado, Proveedor, Producto, Pedido]),
  ],
  controllers: [
    AppController,
    ClientesController,
    EmpleadosController,
    ProveedoresController,
    ProductosController,
    PedidosController,
  ],
  providers: [
    AppService,
    ClientesService,
    EmpleadosService,
    ProveedoresService,
    ProductosService,
    PedidosService,
  ],
})
export class AppModule {}
