import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Column } from 'src/columns/schemas/column.schema';
import { Task } from 'src/tasks/schemas/task.schema';
import { Subtask } from 'src/subtasks/schemas/subtask.schema';
import { Model } from 'mongoose';

@Injectable()
export class SeedsService implements OnApplicationBootstrap {
  // count tasks
  number = 1;

  constructor(
    @InjectModel(Column.name) private readonly columnModel: Model<Column>,
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
    @InjectModel(Subtask.name) private readonly subtaskModel: Model<Subtask>,
  ) {}

  async onApplicationBootstrap() {
    await this.columnModel.deleteMany({}).exec();
    await this.taskModel.deleteMany({}).exec();
    await this.subtaskModel.deleteMany({}).exec();

    const columns = await this.createColumns();

    const [tasks, tasks2, tasks3] = await Promise.all([
      this.createTasks(columns[0]),
      this.createTasks(columns[1]),
      this.createTasks(columns[2]),
    ]);

    columns[0].tasks = tasks;
    columns[1].tasks = tasks2;
    columns[2].tasks = tasks3;

    await Promise.all([columns[0].save(), columns[1].save(), columns[2].save()]);
  }

  createTasks(column: Column) {
    return this.taskModel.create([
      {
        title: `Task ${this.number}`,
        description: `Task ${this.number++} description`,
        position: 0,
        column: column._id,
      },
      {
        title: `Task ${this.number}`,
        description: `Task ${this.number++} description`,
        position: 1,
        column: column._id,
      },
      {
        title: `Task ${this.number}`,
        description: `Task ${this.number++} description`,
        position: 2,
        column: column._id,
      },
    ]);
  }

  async createColumns() {
    return await this.columnModel.create([
      {
        title: 'To do',
        description: 'Tasks to do',
        position: 0,
      },
      {
        title: 'In progress',
        description: 'Tasks in progress',
        position: 1,
      },
      {
        title: 'Blocked',
        description: 'Tasks blocked',
        position: 2,
      },
      {
        title: 'Done',
        description: 'Tasks done',
        position: 3,
      },
    ]);
  }
}
