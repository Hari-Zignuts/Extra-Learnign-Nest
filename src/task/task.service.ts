import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  @Cron('45 * * * * *')
  handleCron() {
    console.log('Called when the current second is 45');
  }
}
