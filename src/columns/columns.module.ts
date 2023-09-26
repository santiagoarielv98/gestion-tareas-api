import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ColumnSchema } from './schemas/column.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Column', schema: ColumnSchema }])],
  controllers: [ColumnsController],
  providers: [ColumnsService],
})
export class ColumnsModule {}
