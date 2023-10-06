import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// dto
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
// schemas
import { Task } from 'src/tasks/schema/task.schema';
import { Column } from './schema/column.schema';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectModel('Column') private columnModel: Model<Column>,
    @InjectModel('Task') private taskModel: Model<Task>,
  ) {}

  async findAll() {
    return this.columnModel.find().exec();
  }

  async findOne(id: string) {
    return this.columnModel.findById(id).exec();
  }

  async update(id: string, updateColumnDto: UpdateColumnDto) {
    return this.columnModel.findByIdAndUpdate(id, updateColumnDto).exec();
  }

  async remove(id: string) {
    return this.columnModel.findByIdAndRemove(id).exec();
  }

  async createTask(id: string, createTaskDto: CreateTaskDto | CreateTaskDto[]) {
    const tasks: Task[] = Array.isArray(createTaskDto) ? createTaskDto : [createTaskDto];

    const createdTasks = await this.taskModel.insertMany(tasks.map((task) => ({ ...task, column: id })));

    return this.columnModel.findByIdAndUpdate(id, {
      $push: {
        tasks: {
          $each: createdTasks,
        },
      },
    });
  }
}
