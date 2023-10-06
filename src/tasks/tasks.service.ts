import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// dto
import { CreateSubtaskDto } from 'src/subtasks/dto/create-subtask.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
// schemas
import { Subtask } from 'src/subtasks/schema/subtask.schema';
import { Task } from './schema/task.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Task') private taskModel: Model<Task>,
    @InjectModel('Subtask') private subtaskModel: Model<Subtask>,
  ) {}
  findAll() {
    return this.taskModel.find().exec();
  }

  findOne(id: string) {
    return this.taskModel.findById(id).exec();
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.taskModel.findByIdAndUpdate(id, updateTaskDto).exec();
  }

  remove(id: string) {
    return this.taskModel.findByIdAndRemove(id).exec();
  }

  async createSubtask(id: string, createSubtaskDto: CreateSubtaskDto | CreateSubtaskDto[]) {
    const subtasks: Subtask[] = Array.isArray(createSubtaskDto) ? createSubtaskDto : [createSubtaskDto];

    const createdsubtasks = await this.taskModel.insertMany(subtasks.map((task) => ({ ...task, column: id })));

    return this.taskModel.findByIdAndUpdate(id, {
      $push: {
        tasks: {
          $each: createdsubtasks,
        },
      },
    });
  }
}
