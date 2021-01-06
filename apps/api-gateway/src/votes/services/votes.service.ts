import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CampaignDto } from 'apps/campaign-service/src/campaigns/dtos/campaign-dto';
import { CreateVoteDto } from '../dtos/create-vote-dto';

@Injectable()
export class VotesService {
    constructor(
        @Inject('VOTE_SERVICE') private client: ClientProxy,
    ) { }

    public async createVote(createVoteDto: CreateVoteDto): Promise<CampaignDto> {
        const result = await this.client.send<CreateVoteDto>({ cmd: 'createVote' }, createVoteDto).toPromise();
        console.log(result);
        return this.client.send<CampaignDto>({ cmd: 'getCampaign' }, createVoteDto.campaignId).toPromise();
    }
}
