import { Injectable } from '@nestjs/common';
import { CampaignDto } from '../dtos/campaign-dto';
import { CampaignListDto } from '../dtos/campaign-list-dto';
import { CreateCampaignDto } from '../dtos/create-campaign-dto';
import { Campaign } from '../models/campaign';
import { CampaignsRepository } from '../repositories/campaigns.repository';
import { ObjectId } from 'mongodb';

@Injectable()
export class CampaignsService {
    constructor(
        private readonly campaignsRepository: CampaignsRepository
    ) {}

    public async createCampaign(createCampaignDto: CreateCampaignDto): Promise<Campaign> {
        return this.campaignsRepository.createCampaign(createCampaignDto);
    }

    public async deleteCampaign(id: ObjectId): Promise<Campaign> {
        return this.campaignsRepository.deleteCampaign(id);
    }

    public async getCampaign(id: ObjectId): Promise<CampaignDto> {
        return this.campaignsRepository.getCampaignById(id);
    }

    public async getCampaignList(): Promise<CampaignListDto> {
        return this.campaignsRepository.getCampaignList();
    }
}
