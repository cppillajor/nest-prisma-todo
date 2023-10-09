import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
@Processor('transcode')
export class BackgroundProcessorConsumer {
  private readonly logger = new Logger(BackgroundProcessorConsumer.name);

  @Process()
  async transcode(job: Job<unknown>) {
    const data = job.data as any[];
    data.sort(
      (a, b) => new Date(a.dueBy).getTime() - new Date(b.dueBy).getTime(),
    );

    return data;
  }
}
