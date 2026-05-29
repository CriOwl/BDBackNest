import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { PedidoDetalleService } from './pedido-detalle.service';
import { CreatePedidoDetalleDto } from './dto/create-pedido-detalle.dto';
import { UpdatePedidoDetalleDto } from './dto/update-pedido-detalle.dto';
import { QueryDto } from '../common/dto/query.dto';

@Controller('pedido-detalle')
export class PedidoDetalleController {
  constructor(private readonly pedidoDetalleService: PedidoDetalleService) {}

  @Post()
  create(@Body() createPedidoDetalleDto: CreatePedidoDetalleDto) {
    return this.pedidoDetalleService.create(createPedidoDetalleDto);
  }

  @Get()
  findAll(@Query() queryDto: QueryDto) {
    return this.pedidoDetalleService.findAll(queryDto);
  }

  @Get(':id/:clienteId')
  findOne(@Param('id', ParseIntPipe) id: number, @Param('clienteId', ParseIntPipe) clienteId: number) {
    return this.pedidoDetalleService.findOne(id, clienteId);
  }

  @Patch(':id/:clienteId')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Param('clienteId', ParseIntPipe) clienteId: number,
    @Body() updatePedidoDetalleDto: UpdatePedidoDetalleDto,
  ) {
    return this.pedidoDetalleService.update(id, clienteId, updatePedidoDetalleDto);
  }

  @Delete(':id/:clienteId')
  remove(@Param('id', ParseIntPipe) id: number, @Param('clienteId', ParseIntPipe) clienteId: number) {
    return this.pedidoDetalleService.remove(id, clienteId);
  }
}
