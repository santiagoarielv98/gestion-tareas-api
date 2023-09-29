import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateColumnDto } from './dto/create-column.dto';
import { Column } from './schemas/column.schema';
import { UpdateColumnPositionDto } from './dto/update-column.dto';

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

  async updatePosition(id: string, updateColumnDto: UpdateColumnPositionDto) {
    const { source, destination } = updateColumnDto;

    const columns = await this.columnModel.find().sort('position').exec();

    const [removed] = columns.splice(source.index, 1);
    columns.splice(destination.index, 0, removed);

    const promises = columns.map((column, index) =>
      column.position === index
        ? Promise.resolve()
        : this.columnModel.findByIdAndUpdate(column._id, { position: index }),
    );

    await Promise.all(promises);
  }
}
