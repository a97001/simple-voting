import { BadRequestException, HttpException, Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateVoteDto } from 'apps/vote-service/src/votes/dtos/create-vote-dto';
import { VoteDto } from 'apps/vote-service/src/votes/dtos/vote-dto';
import { CampaignsService } from '../../campaigns/services/campaigns.service';
import { ObjectId } from 'mongodb';
import NodeCache from "node-cache";
import { CampaignDto } from 'apps/campaign-service/src/campaigns/dtos/campaign-dto';

@Injectable()
export class VotesService implements OnApplicationBootstrap {
    campaignCache = new NodeCache({ stdTTL: 50, checkperiod: 60 });

    constructor(
        @Inject('VOTE_SERVICE') private client: ClientProxy,
        private readonly campaignsService: CampaignsService
    ) { }

    public async createVote(createVoteDto: CreateVoteDto): Promise<VoteDto> {
        let campaign = this.campaignCache.get<CampaignDto>(createVoteDto.campaignId); // Get campaign from cache
        if (!campaign) {
            campaign = await this.campaignsService.getCampaign(new ObjectId(createVoteDto.campaignId));
            if (campaign) {
                this.campaignCache.set(createVoteDto.campaignId, campaign);
            }
        }
        const now = new Date();
        if (campaign &&
            campaign.candidates.find(c => c._id.toString() === createVoteDto.candidateId) &&
            campaign.startAt <= now && now < campaign.endAt
        ) {
            try {
                const result = await this.client.send<VoteDto>({ cmd: 'createVote' }, createVoteDto).toPromise();
                return result;
            } catch (err) {
                throw new HttpException(err, err.statusCode);
            }
        }
        throw new BadRequestException(["Invalid campaignId, candidateId or out of voting time"]);
    }

    async onApplicationBootstrap() {
        await this.client.connect();
    }
}
