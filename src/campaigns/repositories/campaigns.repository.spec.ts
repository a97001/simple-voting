import { Test, TestingModule } from '@nestjs/testing';
import { CampaignsRepository } from './campaigns.repository';

describe('CampaignsRepository', () => {
  let provider: CampaignsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampaignsRepository],
    }).compile();

    provider = module.get<CampaignsRepository>(CampaignsRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
