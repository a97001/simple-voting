import { Test, TestingModule } from '@nestjs/testing';
import { VotesRepository } from './votes.repository';

describe('VotesRepository', () => {
  let provider: VotesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VotesRepository],
    }).compile();

    provider = module.get<VotesRepository>(VotesRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
