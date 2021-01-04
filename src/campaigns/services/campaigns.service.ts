import { Injectable } from '@nestjs/common';
import { CampaignDto } from '../dtos/campaign-dto';
import { CreateCampaignDto } from '../dtos/create-campaign-dto';
import { Campaign } from '../models/campaign';
import { CampaignsRepository } from '../repositories/campaigns.repository';

@Injectable()
export class CampaignsService {
    constructor(
        private readonly campaignsRepository: CampaignsRepository
    ) {}

    public async createCampaign(createCampaignDto: CreateCampaignDto): Promise<Campaign> {
        return this.campaignsRepository.createCampaign(createCampaignDto);
    }
}
