import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { QueryDto } from '../common/dto/query.dto';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidosService.create(createPedidoDto);
  }

  @Get()
  findAll(@Query() queryDto: QueryDto) {
    return this.pedidosService.findAll(queryDto);
  }

  @Get(':id/:clienteId')
  findOne(@Param('id', ParseIntPipe) id: number, @Param('clienteId', ParseIntPipe) clienteId: number) {
    return this.pedidosService.findOne(id, clienteId);
  }

  @Patch(':id/:clienteId')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Param('clienteId', ParseIntPipe) clienteId: number,
    @Body() updatePedidoDto: UpdatePedidoDto,
  ) {
    return this.pedidosService.update(id, clienteId, updatePedidoDto);
  }

  @Delete(':id/:clienteId')
  remove(@Param('id', ParseIntPipe) id: number, @Param('clienteId', ParseIntPipe) clienteId: number) {
    return this.pedidosService.remove(id, clienteId);
  }
}
