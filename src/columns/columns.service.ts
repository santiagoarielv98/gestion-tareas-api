import { Injectable } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
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

  findAll() {
    return this.columnModel
      .find()
      .populate({
        path: 'tasks',
        populate: {
          path: 'subtasks',
        },
      })
      .exec();
  }

  findOne(id: string) {
    return this.columnModel.findById(id).populate('tasks').exec();
  }

  update(id: string, updateColumnDto: UpdateColumnDto) {
    return this.columnModel.findByIdAndUpdate(id, updateColumnDto, { new: true }).exec();
  }

  remove(id: string) {
    return this.columnModel.findByIdAndDelete(id).exec();
  }
}
