import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
// services
import { BoardsService } from './boards.service';
// dto
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardsService.update(id, updateBoardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardsService.remove(id);
  }

  @Post(':id/columns')
  createColumn(@Param('id') boardId: string, @Body() createBoardDto: CreateBoardDto | CreateBoardDto[]) {
    return this.boardsService.createColumn(boardId, createBoardDto);
  }
}
