import { Injectable } from '@nestjs/common';
import { Campaign } from 'apps/campaign-service/src/campaigns/models/campaign';
import { CreateVoteDto } from '../dtos/create-vote-dto';
import { VotesRepository } from '../repositories/votes.repository';

@Injectable()
export class VotesService {
    constructor(
        private readonly votesRepository: VotesRepository
    ) { }

    public async createVote(createVoteDto: CreateVoteDto): Promise<Campaign> {
        // this.votesRepository.createVote(createVoteDto);
        return null;
    }
}
