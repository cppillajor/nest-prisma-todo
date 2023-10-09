import { Test, TestingModule } from '@nestjs/testing';
import { TaskWsService } from './task-ws.service';

describe('TaskWsService', () => {
  let service: TaskWsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskWsService],
    }).compile();

    service = module.get<TaskWsService>(TaskWsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
