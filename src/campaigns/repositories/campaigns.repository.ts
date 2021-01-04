import { Injectable } from '@nestjs/common';
import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateCampaignDto } from '../dtos/create-campaign-dto';
import { Campaign } from '../models/campaign';

@Injectable()
export class CampaignsRepository {
    constructor(
        @InjectModel(Campaign) private readonly campaignModel: ReturnModelType<typeof Campaign>,
    ) {}

    public async createCampaign(campaignDto: CreateCampaignDto): Promise<Campaign> {
        const campaignDoc: DocumentType<Campaign> = new this.campaignModel(campaignDto);
        await campaignDoc.save();
        return campaignDoc.toObject(); 
    }

    // public async updateCampaign(campaign: Campaign): Promise<Campaign> {
    // }

    // public async deleteCampaign(campaign: Campaign): Promise<Campaign> {
    // }
}
