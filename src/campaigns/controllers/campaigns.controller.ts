import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CampaignDto } from '../dtos/campaign-dto';
import { CreateCampaignDto } from '../dtos/create-campaign-dto';
import { CampaignsService } from '../services/campaigns.service';

@ApiTags('campaigns')
@Controller('campaigns')
export class CampaignsController {
    constructor(
        private readonly campaignsService: CampaignsService
    ) { }

    @Post()
    @ApiResponse({ status: 201, description: 'Creates new campaign.', type: CampaignDto })
    async createCampaign(@Body() createCampaignDto: CreateCampaignDto): Promise<CampaignDto> {
        return this.campaignsService.createCampaign(createCampaignDto);
    }

    @Put()
    async updateCampaign(): Promise<any> {
        return;
    }

    @Delete()
    async deleteCampaign(): Promise<any> {}

    @Get()
    async getCampaign(): Promise<any> {
        return;
    }

    @Get()
    async getCampaignList(): Promise<any> {}
}
