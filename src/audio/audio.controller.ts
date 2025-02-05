import { InjectQueue } from '@nestjs/bull';
import { Controller, Get, Session } from '@nestjs/common';
import { Queue } from 'bull';

@Controller('audio')
export class AudioController {
  constructor(
    @InjectQueue('audio-queue')
    private readonly audioQueue: Queue,
  ) {}

  @Get('transcode')
  async transcode(@Session() session: Record<string, any>) {
    session.user = { id: 1, username: 'Jane' };
    await this.audioQueue.add('transcode', {
      file: 'audio.mp3',
    });
    return { message: 'Job added to queue' };
  }

  @Get('transcode-with-session')
  transcodeWithSession(@Session() session: Record<string, any>) {
    const user: unknown = session.user;
    return { user };
  }
}
