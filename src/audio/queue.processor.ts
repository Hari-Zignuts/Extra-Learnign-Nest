import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('audio-queue')
export class AudioProcessor {
  private logger = new Logger(AudioProcessor.name);
  @Process('transcode')
  async handleCompleteJob(job: Job<{ file: string }>) {
    console.log(`Processing job for Started: ${job.data.file}`);

    // Simulate email sending
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(`Processing job for Completed: ${job.data.file}`);
  }
}
