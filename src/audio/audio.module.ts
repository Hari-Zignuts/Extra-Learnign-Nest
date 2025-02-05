import { Module } from '@nestjs/common';
import { AudioController } from './audio.controller';
import { BullModule } from '@nestjs/bull';
import { AudioProcessor } from './queue.processor';
import { AudioEventListener } from './audio.event-listener';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'audio-queue',
    }),
  ],
  providers: [AudioProcessor, AudioEventListener],
  controllers: [AudioController],
})
export class AudioModule {}
