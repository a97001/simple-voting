import { BadRequestException, HttpException, Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateVoteDto } from 'apps/vote-service/src/votes/dtos/create-vote-dto';
import { VoteDto } from 'apps/vote-service/src/votes/dtos/vote-dto';
import { CampaignsService } from '../../campaigns/services/campaigns.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class VotesService implements OnApplicationBootstrap {
    constructor(
        @Inject('VOTE_SERVICE') private client: ClientProxy,
        private readonly campaignsService: CampaignsService
    ) { }

    public async createVote(createVoteDto: CreateVoteDto): Promise<VoteDto> {
        const campaign = await this.campaignsService.getCampaign(new ObjectId(createVoteDto.campaignId));
        if (campaign && campaign.candidates.find(c => c._id.toString() === createVoteDto.candidateId)) {
            try {
                const result = await this.client.send<VoteDto>({ cmd: 'createVote' }, createVoteDto).toPromise();
                return result;
            } catch (err) {
                throw new HttpException(err, err.statusCode);
            }
        }
        throw new BadRequestException(["Invalid campaignId or candidateId"]);
    }

    async onApplicationBootstrap() {
        await this.client.connect();
    }
}
