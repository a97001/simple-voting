import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CampaignDto } from 'apps/campaign-service/src/campaigns/dtos/campaign-dto';
import { CreateCampaignDto } from 'apps/campaign-service/src/campaigns/dtos/create-campaign-dto';
import { CreateVoteDto } from '../dtos/create-vote-dto';

@ApiTags('votes')
@Controller('votes')
@ApiResponse({ status: 400, description: 'Request contains invalid parameters' })
export class VotesController {
    @Post()
    @ApiResponse({ status: 201, description: 'Vote for a campaign.', type: CampaignDto })
    async createVote(@Body() createVoteDto: CreateVoteDto): Promise<CampaignDto> {
        // return this.campaignsService.createCampaign(createCampaignDto);
        return null;
    }
}
