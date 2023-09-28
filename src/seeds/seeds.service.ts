import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Column } from 'src/columns/schemas/column.schema';
import { Task } from 'src/tasks/schemas/task.schema';
import { Subtask } from 'src/subtasks/schemas/subtask.schema';

@Injectable()
export class SeedsService implements OnApplicationBootstrap {
  constructor(
    @InjectModel(Column.name) private readonly columnModel,
    @InjectModel(Task.name) private readonly taskModel,
    @InjectModel(Subtask.name) private readonly subtaskModel,
  ) {}

  async onApplicationBootstrap() {
    await this.columnModel.deleteMany({}).exec();
    await this.taskModel.deleteMany({}).exec();
    await this.subtaskModel.deleteMany({}).exec();

    const columns = await this.columnModel.create([
      {
        title: 'To do',
        description: 'Tasks to do',
      },
      {
        title: 'In progress',
        description: 'Tasks in progress',
      },
      {
        title: 'Done',
        description: 'Tasks done',
      },
    ]);

    const tasks = await this.taskModel.create([
      {
        title: 'Task 1',
        description: 'Task 1 description',
        column: columns[0]._id,
        position: columns[0].tasks.length,
      },
      {
        title: 'Task 2',
        description: 'Task 2 description',
        column: columns[1]._id,
        position: columns[1].tasks.length,
      },
      {
        title: 'Task 3',
        description: 'Task 3 description',
        column: columns[2]._id,
        position: columns[2].tasks.length,
      },
    ]);

    columns[0].tasks.push(tasks[0]._id);
    columns[1].tasks.push(tasks[1]._id);
    columns[2].tasks.push(tasks[2]._id);

    await Promise.all([columns[0].save(), columns[1].save(), columns[2].save()]);
  }
}
