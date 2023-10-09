import { Test, TestingModule } from '@nestjs/testing';
import { BackgroundProcessorService } from './background-processor.service';

describe('BackgroundProcessorService', () => {
  let service: BackgroundProcessorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BackgroundProcessorService],
    }).compile();

    service = module.get<BackgroundProcessorService>(BackgroundProcessorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
