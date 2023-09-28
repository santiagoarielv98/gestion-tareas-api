import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/gestion-tareas', {}),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
