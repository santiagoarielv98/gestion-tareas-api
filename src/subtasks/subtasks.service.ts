import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// dto
import { UpdateSubtaskDto } from './dto/update-subtask.dto';
// schemas
import { Subtask } from './schema/subtask.schema';

@Injectable()
export class SubtasksService {
  constructor(@InjectModel('Subtask') private subtaskModel: Model<Subtask>) {}

  findAll() {
    return this.subtaskModel.find().exec();
  }

  findOne(id: string) {
    return this.subtaskModel.findById(id).exec();
  }

  update(id: string, updateSubtaskDto: UpdateSubtaskDto) {
    return this.subtaskModel.findByIdAndUpdate(id, updateSubtaskDto).exec();
  }

  remove(id: string) {
    return this.subtaskModel.findByIdAndRemove(id).exec();
  }
}
