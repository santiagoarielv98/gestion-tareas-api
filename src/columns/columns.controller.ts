import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';

@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post()
  create(@Body() createColumnDto: CreateColumnDto) {
    return this.columnsService.create(createColumnDto);
  }

  @Get()
  findAll() {
    return this.columnsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.columnsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateColumnDto: CreateColumnDto) {
    return this.columnsService.update(id, updateColumnDto);
  }

  @Put(':id/position')
  updatePosition(@Param('id') id: string, @Body() updateColumnDto: CreateColumnDto) {
    return this.columnsService.updatePosition(id, updateColumnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.columnsService.remove(id);
  }
}
