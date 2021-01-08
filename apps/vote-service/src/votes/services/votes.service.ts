import { Injectable } from '@nestjs/common';
import { CreateVoteDto } from '../dtos/create-vote-dto';
import { Vote } from '../models/vote';
import { VotesRepository } from '../repositories/votes.repository';
import crypto from 'crypto';

@Injectable()
export class VotesService {

    constructor(
        private readonly votesRepository: VotesRepository
    ) { }

    public async createVote(createVoteDto: CreateVoteDto): Promise<Vote> {
        createVoteDto.hkid = crypto.createHash('sha256').update(createVoteDto.hkid).digest('base64');
        return this.votesRepository.createVote(createVoteDto);
    }
}
