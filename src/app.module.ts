import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { TasksModule } from './tasks/tasks.module';
import { SubtasksModule } from './subtasks/subtasks.module';
import { ColumnsModule } from './columns/columns.module';
import { SeedsService } from './seeds/seeds.service';
import { KanbanModule } from './kanban/kanban.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, SubtasksModule, TasksModule, ColumnsModule, KanbanModule],
  controllers: [],
  providers: [SeedsService],
})
export class AppModule {}
