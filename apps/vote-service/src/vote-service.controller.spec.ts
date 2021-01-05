import { Test, TestingModule } from '@nestjs/testing';
import { VoteServiceController } from './vote-service.controller';
import { VoteServiceService } from './vote-service.service';

describe('VoteServiceController', () => {
  let voteServiceController: VoteServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [VoteServiceController],
      providers: [VoteServiceService],
    }).compile();

    voteServiceController = app.get<VoteServiceController>(VoteServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(voteServiceController.getHello()).toBe('Hello World!');
    });
  });
});
