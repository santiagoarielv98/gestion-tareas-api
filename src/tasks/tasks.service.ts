import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Column } from 'src/columns/schemas/column.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { MoveTaskDto, UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    @InjectModel(Column.name) private columnModel: Model<Column>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const count = await this.taskModel.countDocuments({
      column: createTaskDto.column,
    });

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

  async move(id: string, moveTaskDto: MoveTaskDto) {
    const { source, destination } = moveTaskDto;

    if (source.droppableId === destination.droppableId) {
      const column = await this.columnModel
        .findById(source.droppableId)
        .populate({
          path: 'tasks',
          options: {
            sort: 'position',
          },
        })
        .exec();

      const [removed] = column.tasks.splice(source.index, 1);
      column.tasks.splice(destination.index, 0, removed);

      const promises = column.tasks.map((task, index) =>
        task.position === index ? Promise.resolve() : this.taskModel.findByIdAndUpdate(task._id, { position: index }),
      );

      await Promise.all(promises);
    } else {
      const columnSource = await this.columnModel
        .findById(source.droppableId)
        .populate({
          path: 'tasks',
          options: {
            sort: 'position',
          },
        })
        .exec();
      const columnDestination = await this.columnModel
        .findById(destination.droppableId)
        .populate({
          path: 'tasks',
          options: {
            sort: 'position',
          },
        })
        .exec();

      const [removed] = columnSource.tasks.splice(source.index, 1);
      columnDestination.tasks.splice(destination.index, 0, removed);

      const sourcePromises = columnSource.tasks.map((task, index) =>
        task.position === index ? Promise.resolve() : this.taskModel.findByIdAndUpdate(task._id, { position: index }),
      );

      const destinationPromises = columnDestination.tasks.map((task, index) =>
        task.position === index ? Promise.resolve() : this.taskModel.findByIdAndUpdate(task._id, { position: index }),
      );
      await Promise.all([columnSource.save(), columnDestination.save(), ...sourcePromises, ...destinationPromises]);
    }
  }
  remove(id: string) {
    return this.taskModel.findByIdAndDelete(id).exec();
  }
}
