import { Test, TestingModule } from '@nestjs/testing';
import { BackgroundProcessorController } from './background-processor.controller';
import { BackgroundProcessorService } from './background-processor.service';

describe('BackgroundProcessorController', () => {
  let controller: BackgroundProcessorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BackgroundProcessorController],
      providers: [BackgroundProcessorService],
    }).compile();

    controller = module.get<BackgroundProcessorController>(BackgroundProcessorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
