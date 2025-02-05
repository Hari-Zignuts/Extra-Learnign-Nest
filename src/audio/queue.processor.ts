import { Process, Processor } from '@nestjs/bull';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Job } from 'bull';

@Processor('audio-queue')
export class AudioProcessor {
  constructor(private readonly eventEmitter: EventEmitter2) {}
  @Process('transcode')
  async handleCompleteJob(job: Job<{ file: string }>) {
    console.log(`Processing job for Started: ${job.data.file}`);
    this.eventEmitter.emit('audio.transcode', { file: job.data.file });

    // Simulate email sending
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(`Processing job for Completed: ${job.data.file}`);
  }
}
