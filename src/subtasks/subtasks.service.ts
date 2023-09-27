import { Injectable } from '@nestjs/common';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { UpdateSubtaskDto } from './dto/update-subtask.dto';
import { Subtask } from './schemas/subtask.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from 'src/tasks/schemas/task.schema';

@Injectable()
export class SubtasksService {
  constructor(
    @InjectModel(Subtask.name) private subtaskModel: Model<Subtask>,
    @InjectModel(Task.name) private taskModel: Model<Task>,
  ) {}

  async create(createSubtaskDto: CreateSubtaskDto) {
    const count = await this.subtaskModel.countDocuments({ task: createSubtaskDto.task });

    const newSubtask = await new this.subtaskModel({
      ...createSubtaskDto,
      position: count,
    }).save();

    await this.taskModel.findByIdAndUpdate(
      newSubtask.task,
      {
        $push: {
          subtasks: newSubtask._id,
        },
      },
      { new: true },
    );

    return newSubtask;
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
