import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      return await firstValueFrom(
        this.productsClient.send({ cmd: 'create_product' }, createProductDto),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  findProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send({ cmd: 'find_all_product' }, paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await firstValueFrom(
        this.productsClient.send({ cmd: 'find_one_product' }, { id }),
      );
    } catch (error) {
      throw new RpcException(error);
    }

    // -- EJEMPLO DE COMO MANEJAR EL OBSERVABLE SIN TRYCATCH --

    // return this.productsClient.send({ cmd: 'find_one_product' }, { id }).pipe(
    //   catchError((err) => {
    //     throw new RpcException(err);
    //   }),
    // );
  }

  @Patch(':id')
  async updateProduct(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      const payload = { id, ...updateProductDto };
      return await firstValueFrom(
        this.productsClient.send({ cmd: 'update_product' }, payload),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    try {
      return await firstValueFrom(
        this.productsClient.send({ cmd: 'delete_product' }, { id }),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
