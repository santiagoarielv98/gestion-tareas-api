import { Injectable } from '@nestjs/common';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { UpdateSubtaskDto } from './dto/update-subtask.dto';
import { Subtask } from './schemas/subtask.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SubtasksService {
  constructor(@InjectModel(Subtask.name) private subtaskModel: Model<Subtask>) {}

  create(createSubtaskDto: CreateSubtaskDto) {
    return new this.subtaskModel(createSubtaskDto).save();
  }

  findAll() {
    return this.subtaskModel.find().exec();
  }

  findOne(id: string) {
    return this.subtaskModel.findById(id).exec();
  }

  update(id: string, updateSubtaskDto: UpdateSubtaskDto) {
    return this.subtaskModel.findByIdAndUpdate(id, updateSubtaskDto, { new: true }).exec();
  }

  remove(id: string) {
    return this.subtaskModel.findByIdAndDelete(id).exec();
  }
}
