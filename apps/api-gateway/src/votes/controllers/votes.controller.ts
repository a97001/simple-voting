import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateVoteDto } from 'apps/vote-service/src/votes/dtos/create-vote-dto';
import { VoteDto } from 'apps/vote-service/src/votes/dtos/vote-dto';
import { VotesService } from '../services/votes.service';

@ApiTags('votes')
@Controller('votes')
@ApiResponse({ status: 400, description: 'Request contains invalid parameters' })
export class VotesController {
    constructor (
        private readonly votesService: VotesService
    ) {}

    @Post()
    @ApiResponse({ status: 201, description: 'Vote for a campaign.', type: VoteDto })
    async createVote(@Body() createVoteDto: CreateVoteDto): Promise<VoteDto> {
        return this.votesService.createVote(createVoteDto);
    }
}
