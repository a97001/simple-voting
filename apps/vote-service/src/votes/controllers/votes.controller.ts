import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateVoteDto } from '../dtos/create-vote-dto';
import { VoteDto } from '../dtos/vote-dto';
import { VotesService } from '../services/votes.service';

@Controller()
export class VotesController {
    constructor(
        private readonly votesService: VotesService
    ) {}

    @MessagePattern({ cmd: 'createVote' })
    async createVote(createVoteDto: CreateVoteDto): Promise<VoteDto> {
        const vote = await this.votesService.createVote(createVoteDto);
        return vote.toDto();
    }
}
