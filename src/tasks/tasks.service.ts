import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './schemas/task.schema';
import { Column } from 'src/columns/schemas/column.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    @InjectModel(Column.name) private columnModel: Model<Column>,
  ) {}

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
    const { source, destination, ...update } = updateTaskDto;

    if (source.droppableId === destination.droppableId) {
      await Promise.all([
        this.taskModel.findOneAndUpdate({ position: destination.index }, { position: source.index }).exec(),
        this.taskModel.findByIdAndUpdate(id, { ...update, position: destination.index }).exec(),
      ]);
    } else {
      const columns = await this.columnModel.find().populate({
        path: 'tasks',
        options: {
          sort: 'position',
        },
      });

      const sourceColumn = columns.find((column) => column._id.toString() === source.droppableId);

      const destinationColumn = columns.find((column) => column._id.toString() === destination.droppableId);

      if (!sourceColumn || !destinationColumn) {
        throw new Error('Column not found');
      }
      const [removed] = sourceColumn.tasks.splice(source.index, 1);
      destinationColumn.tasks.splice(destination.index, 0, removed);

      // await Promise.all([
      //   this.taskModel.bulkWrite([
      //     ...destinationColumn.tasks.map((task, index) => ({
      //       updateOne: {
      //         filter: { _id: task._id },
      //         update: { position: index },
      //       },
      //     })),
      //     ...sourceColumn.tasks.map((task, index) => ({
      //       updateOne: {
      //         filter: { _id: task._id },
      //         update: { position: index },
      //       },
      //     })),
      //   ]),
      // ]);

      await Promise.all([sourceColumn.save(), destinationColumn.save()]);
    }
  }

  remove(id: string) {
    return this.taskModel.findByIdAndDelete(id).exec();
  }
}
