import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  createProduct() {
    return 'Crea un producto';
  }

  @Get()
  findProducts() {
    return 'Busca listado de productos';
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return `Busca un producto con id: ${id}`;
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return `Elimina un producto con id: ${id}`;
  }

  @Patch(':id')
  updateProduct(@Body() body: any, @Param('id', ParseIntPipe) id: number) {
    return `Edita un producto con id: ${id}`;
  }
}
