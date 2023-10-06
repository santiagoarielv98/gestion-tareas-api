import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
// modules
import { BoardsModule } from './boards/boards.module';
import { ColumnsModule } from './columns/columns.module';
import { SubtasksModule } from './subtasks/subtasks.module';
import { TasksModule } from './tasks/tasks.module';
// services
import { SeedsService } from './seeds/seeds.service';

const uri = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/kanban';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(uri),
    BoardsModule,
    ColumnsModule,
    TasksModule,
    SubtasksModule,
  ],
  controllers: [],
  providers: [SeedsService],
})
export class AppModule {}
