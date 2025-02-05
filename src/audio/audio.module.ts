import { Module } from '@nestjs/common';
import { AudioController } from './audio.controller';
import { BullModule } from '@nestjs/bull';
import { AudioProcessor } from './queue.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'audio-queue',
    }),
  ],
  providers: [AudioProcessor],
  controllers: [AudioController],
})
export class AudioModule {}
