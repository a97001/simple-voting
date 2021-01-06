import { Injectable } from '@nestjs/common';
import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CampaignListDto } from '../dtos/campaign-list-dto';
import { CreateCampaignDto } from '../dtos/create-campaign-dto';
import { Campaign } from '../models/campaign';
import { ObjectId } from "mongodb";
import { CampaignDto } from '../dtos/campaign-dto';
import { VoteDto } from 'apps/vote-service/src/votes/dtos/vote-dto';

@Injectable()
export class CampaignsRepository {
    constructor(
        @InjectModel(Campaign) private readonly campaignModel: ReturnModelType<typeof Campaign>,
    ) { }

    public async createCampaign(campaignDto: CreateCampaignDto): Promise<Campaign> {
        const campaignDoc: DocumentType<Campaign> = new this.campaignModel(campaignDto);
        await campaignDoc.save();
        return campaignDoc;
    }

    // public async updateCampaign(campaign: Campaign): Promise<Campaign> {
    // }

    public async deleteCampaign(id: ObjectId): Promise<CampaignDto> {
        const result = await this.campaignModel.findByIdAndDelete(id).exec();
        return result;
    }

    public async getCampaignById(id: ObjectId): Promise<CampaignDto> {
        const result = await this.campaignModel.findById(id).exec();
        return result;
    }

    public async getCampaignList(): Promise<CampaignListDto> {
        const result = await this.campaignModel.paginate({});
        return result;
    }

    public async updateCampaignVoteCnt(vote: VoteDto): Promise<CampaignDto> {
        const result = await this.campaignModel.findOneAndUpdate(
            {
                _id: vote.campaignId,
                'candidates._id': vote.candidateId,
                startAt: { $lte: vote.createdAt },
                endAt: { $gt: vote.createdAt }
            },
            {
                $inc: {
                    totalVoteCnt: 1,
                    'candidates.$.voteCnt': 1
                }
            },
            { new: true }
        ).exec();
        return result;
    }
}
