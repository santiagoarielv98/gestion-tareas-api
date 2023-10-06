import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// controllers
import { BoardsController } from './boards.controller';
// services
import { BoardsService } from './boards.service';
// schemas
import { Column, ColumnSchema } from 'src/columns/schema/column.schema';
import { Board, BoardSchema } from './schema/board.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Board.name, schema: BoardSchema },
      { name: Column.name, schema: ColumnSchema },
    ]),
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
  exports: [MongooseModule],
})
export class BoardsModule {}
