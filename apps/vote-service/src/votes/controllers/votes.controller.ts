import { Body, Controller, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CampaignDto } from 'apps/campaign-service/src/campaigns/dtos/campaign-dto';
import { CreateCampaignDto } from 'apps/campaign-service/src/campaigns/dtos/create-campaign-dto';
import { CreateVoteDto } from '../dtos/create-vote-dto';

@Controller()
export class VotesController {
    @MessagePattern({ cmd: 'createVote' })
    async createVote(createVoteDto: CreateVoteDto): Promise<void> {
        // return this.campaignsService.createCampaign(createCampaignDto);
    }
}
