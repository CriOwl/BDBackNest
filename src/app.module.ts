import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Empleado } from './empleados/entities/empleado.entity';
import { Proveedor } from './proveedores/entities/proveedor.entity';
import { Producto } from './productos/entities/producto.entity';
import { Pedido } from './pedidos/entities/pedido.entity';
import { EmpleadosService } from './empleados/empleados.service';
import { EmpleadosController } from './empleados/empleados.controller';
import { ProveedoresService } from './proveedores/proveedores.service';
import { ProveedoresController } from './proveedores/proveedores.controller';
import { ProductosService } from './productos/productos.service';
import { ProductosController } from './productos/productos.controller';
import { PedidosService } from './pedidos/pedidos.service';
import { PedidosController } from './pedidos/pedidos.controller';
import { Persona } from './persona/entities/persona.entity';
import { PersonaService } from './persona/persona.service';
import { PersonaController } from './persona/persona.controller';
import { CatalogoController } from './catalogo/catalogo.controller';
import { CatalogoService } from './catalogo/catalogo.service';
import { Catalogo } from './catalogo/entities/catalogo.entity';
import { Sucursal } from './sucursal/entities/sucursal.entity';
import { Inventario } from './inventario/entities/inventario.entity';
import { InventarioController } from './inventario/inventario.controller';
import { InventarioService } from './inventario/inventario.service';
import { SucursalController } from './sucursal/sucursal.controller';
import { SucursalService } from './sucursal/sucursal.service';

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
        entities: [Catalogo, Persona, Empleado, Proveedor, Producto, Pedido, Sucursal, Inventario],
        synchronize: true, // Solo para desarrollo
      }),
    }),
    TypeOrmModule.forFeature([Catalogo, Persona, Empleado, Proveedor, Producto, Pedido, Sucursal, Inventario]),
  ],
  controllers: [
    AppController,
    CatalogoController,
    PersonaController,
    EmpleadosController,
    ProveedoresController,
    ProductosController,
    PedidosController,
    SucursalController,
    InventarioController,
  ],
  providers: [
    AppService,
    CatalogoService,
    PersonaService,
    EmpleadosService,
    ProveedoresService,
    ProductosService,
    PedidosService,
    SucursalService,
    InventarioService,
  ],
})
export class AppModule {}
