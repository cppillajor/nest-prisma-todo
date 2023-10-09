import { Test, TestingModule } from '@nestjs/testing';
import { TaskWsGateway } from './task-ws.gateway';
import { TaskWsService } from './task-ws.service';

describe('TaskWsGateway', () => {
  let gateway: TaskWsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskWsGateway, TaskWsService],
    }).compile();

    gateway = module.get<TaskWsGateway>(TaskWsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
