import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './schemas/task.schema';
import { Column } from 'src/columns/schemas/column.schema';

@Injectable()
export class TasksService implements OnApplicationBootstrap {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    @InjectModel(Column.name) private columnModel: Model<Column>,
  ) {}

  async onApplicationBootstrap() {
    await this.taskModel.deleteMany({}).exec();
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const count = await this.taskModel.countDocuments({ column: createTaskDto.column });

    const newTask = await new this.taskModel({
      ...createTaskDto,
      position: count,
    }).save();

    await this.columnModel.findByIdAndUpdate(
      newTask.column,
      {
        $push: {
          tasks: newTask._id,
        },
      },
      { new: true },
    );

    return newTask;
  }

  findAll() {
    return this.taskModel.find().populate('subtasks').exec();
  }

  findOne(id: string) {
    return this.taskModel.findById(id).populate('subtasks').exec();
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.taskModel.findByIdAndUpdate(id, updateTaskDto).exec();
  }

  remove(id: string) {
    return this.taskModel.findByIdAndDelete(id).exec();
  }
}
