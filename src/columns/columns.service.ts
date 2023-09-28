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
        options: {
          sort: 'position',
        },
      })
      .exec();
  }

  findOne(id: string) {
    return this.columnModel.findById(id).populate('tasks').exec();
  }

  async updatePositionColumn(id: string, { source, destination }: UpdateColumnDto) {
    const sourceUpdate = {
      updateOne: {
        filter: { position: destination.index },
        update: { position: source.index },
      },
    };
    const destinationUpdate = {
      updateOne: {
        filter: { _id: id },
        update: { position: destination.index },
      },
    };
    await this.columnModel.bulkWrite([sourceUpdate, destinationUpdate]);
  }

  remove(id: string) {
    return this.columnModel.findByIdAndDelete(id).exec();
  }
}
