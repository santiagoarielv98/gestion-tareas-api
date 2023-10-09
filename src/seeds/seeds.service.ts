import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// schemas
import { Board } from 'src/boards/schema/board.schema';
import { Column } from 'src/columns/schema/column.schema';
import { Subtask } from 'src/subtasks/schema/subtask.schema';
import { Task } from 'src/tasks/schema/task.schema';

@Injectable()
export class SeedsService implements OnApplicationBootstrap {
  constructor(
    @InjectModel('Board') private boardModel: Model<Board>,
    @InjectModel('Column') private columnModel: Model<Column>,
    @InjectModel('Task') private taskModel: Model<Task>,
    @InjectModel('Subtask') private subtaskModel: Model<Subtask>,
  ) {}

  async onApplicationBootstrap() {
    await this.boardModel.deleteMany({});
    await this.columnModel.deleteMany({});
    await this.taskModel.deleteMany({});
    await this.subtaskModel.deleteMany({});
    await this.seed();
  }

  async seed() {
    await this.seedBoard();
  }

  async seedBoard() {
    const boards: Board[] = Array.from({ length: 5 }).map((_, i) => ({
      name: `Board ${i + 1}`,
      description: `Description ${i + 1}`,
      columns: [],
    }));

    const createdBoards = await this.boardModel.insertMany(boards, { ordered: true });

    await Promise.all(
      createdBoards.map(async (board) => {
        const columns = await this.seedColumn(board._id.toString());
        await Promise.all(
          columns.map(async (column) => {
            const tasks = await this.seedTask(column._id.toString());
            await Promise.all(
              tasks.map(async (task) => {
                const subtasks = await this.seedSubtask(task._id.toString());
                task.subtasks = subtasks.map((subtask) => subtask._id.toString());
                await task.save();
              }),
            );
            column.tasks = tasks.map((task) => task._id.toString());
            await column.save();
          }),
        );
        board.columns = columns.map((column) => column._id.toString());
        await board.save();
      }),
    );

    return createdBoards;
  }

  async seedColumn(boardId: string) {
    const columns: Column[] = Array.from({ length: 5 }).map((_, i) => ({
      name: `Column ${i + 1}`,
      description: `Description ${i + 1}`,
      board: boardId,
      position: i,
      tasks: [],
    }));

    const createdColumns = await this.columnModel.insertMany(columns);

    return createdColumns;
  }

  async seedTask(columnId: string) {
    const tasks: Task[] = Array.from({ length: 5 }).map((_, i) => ({
      name: `Task ${i + 1}`,
      description: `Description ${i + 1}`,
      column: columnId,
      position: i,
      done: false,
      subtasks: [],
    }));

    const createdTasks = await this.taskModel.insertMany(tasks);

    return createdTasks;
  }

  async seedSubtask(taskId: string) {
    const subtasks: Subtask[] = Array.from({ length: 5 }).map((_, i) => ({
      name: `Subtask ${i + 1}`,
      description: `Description ${i + 1}`,
      task: taskId,
      position: i,
      done: false,
    }));

    const createdSubtasks = await this.subtaskModel.insertMany(subtasks);

    return createdSubtasks;
  }
}
