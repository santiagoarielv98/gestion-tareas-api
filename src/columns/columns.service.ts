import { Injectable } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Column } from './schemas/column.schema';
import { Model } from 'mongoose';

@Injectable()
export class ColumnsService {
  constructor(@InjectModel(Column.name) private columnModel: Model<Column>) {}

  async create(createColumnDto: CreateColumnDto): Promise<Column> {
    const count = await this.columnModel.countDocuments().exec();
    return new this.columnModel({
      ...createColumnDto,
      position: count,
    }).save();
  }

  async findAll() {
    return this.columnModel
      .find()
      .sort('position')
      .populate({
        path: 'tasks',
        populate: {
          path: 'subtasks',
        },
        options: {
          sort: 'position',
        },
      })
      .exec();
  }

  async findOne(id: string) {
    return this.columnModel.findById(id).populate('tasks').exec();
  }

  async remove(id: string) {
    return this.columnModel.findByIdAndDelete(id).exec();
  }

  async update(id: string, updateColumnDto: CreateColumnDto) {
    return this.columnModel.findByIdAndUpdate(id, updateColumnDto).exec();
  }

  async updatePosition(id: string, updateColumnDto: CreateColumnDto) {
    return this.columnModel.findByIdAndUpdate(id, updateColumnDto).exec();
  }
}
