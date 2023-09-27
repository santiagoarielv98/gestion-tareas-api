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
      .sort('position')
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

  async update(id: string, updateColumnDto: UpdateColumnDto) {
    const { source, destination, ...update } = updateColumnDto;
    if (source.index !== destination.index) {
      await this.columnModel.findOneAndUpdate({ position: destination.index }, { position: source.index }).exec();
      await this.columnModel.findByIdAndUpdate(id, { ...update, position: destination.index }).exec();
    }
  }

  remove(id: string) {
    return this.columnModel.findByIdAndDelete(id).exec();
  }
}
