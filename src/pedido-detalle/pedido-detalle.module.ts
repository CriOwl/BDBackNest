import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoDetalleService } from './pedido-detalle.service';
import { PedidoDetalleController } from './pedido-detalle.controller';
import { PedidoDetalle } from './entities/pedido-detalle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PedidoDetalle])],
  controllers: [PedidoDetalleController],
  providers: [PedidoDetalleService],
  exports: [PedidoDetalleService],
})
export class PedidoDetalleModule {}
