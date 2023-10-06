import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
// services
import { ColumnsService } from './columns.service';
// dto
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Get()
  findAll() {
    return this.columnsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.columnsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateColumnDto: UpdateColumnDto) {
    return this.columnsService.update(id, updateColumnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.columnsService.remove(id);
  }

  @Post(':id/tasks')
  createTask(@Param('id') columnId: string, @Body() createTaskDto: CreateTaskDto | CreateTaskDto[]) {
    return this.columnsService.createTask(columnId, createTaskDto);
  }
}
