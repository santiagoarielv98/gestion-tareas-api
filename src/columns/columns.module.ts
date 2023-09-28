import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { Column, ColumnSchema } from './schemas/column.schema';
// clear collection
@Module({
  imports: [MongooseModule.forFeature([{ name: Column.name, schema: ColumnSchema }])],
  controllers: [ColumnsController],
  providers: [ColumnsService],
})
export class ColumnsModule {}
