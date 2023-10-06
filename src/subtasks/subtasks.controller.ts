import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
// dto
import { UpdateSubtaskDto } from './dto/update-subtask.dto';
// services
import { SubtasksService } from './subtasks.service';

@Controller('subtasks')
export class SubtasksController {
  constructor(private readonly subtasksService: SubtasksService) {}

  @Get()
  findAll() {
    return this.subtasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subtasksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubtaskDto: UpdateSubtaskDto) {
    return this.subtasksService.update(id, updateSubtaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subtasksService.remove(id);
  }
}
