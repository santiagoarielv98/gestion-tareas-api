import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
@Module({
  imports: [DatabaseModule],
  controllers: [ColumnsController],
  providers: [ColumnsService],
})
export class ColumnsModule {}
