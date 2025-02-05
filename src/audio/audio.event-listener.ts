import { Injectable, OnModuleInit } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class AudioEventListener implements OnModuleInit {
  onModuleInit() {
    console.log('The module has been initialized.');
  }

  @OnEvent('audio.transcode')
  handleAudioTranscode(event: { file: string }) {
    console.log('Audio transcoded from EventLister', event.file);
  }
}
