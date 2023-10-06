import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// dto
import { CreateColumnDto } from 'src/columns/dto/create-column.dto';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
// schemas
import { Column } from 'src/columns/schema/column.schema';
import { Board } from './schema/board.schema';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel('Board') private boardModel: Model<Board>,
    @InjectModel('Column') private columnModel: Model<Column>,
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    const createdCat = new this.boardModel(createBoardDto);
    return createdCat.save();
  }

  async findAll() {
    return this.boardModel.find().exec();
  }

  async findOne(id: string) {
    return this.boardModel.findById(id).exec();
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    return this.boardModel.findByIdAndUpdate(id, updateBoardDto).exec();
  }

  async remove(id: string) {
    return this.boardModel.findByIdAndRemove(id).exec();
  }

  async createColumn(id: string, createColumnDto: CreateColumnDto | CreateColumnDto[]) {
    const columns: Column[] = Array.isArray(createColumnDto) ? createColumnDto : [createColumnDto];

    const createdColumns = await this.columnModel.insertMany(columns.map((column) => ({ ...column, board: id })));

    return this.boardModel.findByIdAndUpdate(id, {
      $push: {
        columns: {
          $each: createdColumns,
        },
      },
    });
  }
}
