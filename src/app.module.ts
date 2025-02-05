import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './task/task.service';
import { AudioModule } from './audio/audio.module';
import { BullModule } from '@nestjs/bull';
@Module({
  imports: [
    EventsModule,
    ScheduleModule.forRoot(),
    AudioModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, TaskService],
})
export class AppModule {}
