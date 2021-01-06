import { BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CampaignsService } from '../services/campaigns.service';
import { ObjectId } from 'mongodb';
import { isValidObjectId } from 'mongoose';
import { CampaignDto } from 'apps/campaign-service/src/campaigns/dtos/campaign-dto';
import { CampaignListDto } from 'apps/campaign-service/src/campaigns/dtos/campaign-list-dto';
import { CreateCampaignDto } from 'apps/campaign-service/src/campaigns/dtos/create-campaign-dto';

@ApiTags('campaigns')
@Controller('campaigns')
@ApiResponse({ status: 400, description: 'Request contains invalid parameters' })
export class CampaignsController {
    constructor(
        private readonly campaignsService: CampaignsService
    ) { }

    @Post()
    @ApiResponse({ status: 201, description: 'Creates new campaign.', type: CampaignDto })
    async createCampaign(@Body() createCampaignDto: CreateCampaignDto): Promise<CampaignDto> {
        return this.campaignsService.createCampaign(createCampaignDto);
    }

    // @Put()
    // async updateCampaign(): Promise<any> {
    //     return;
    // }

    @Delete(':id')
    @HttpCode(204)
    @ApiResponse({ status: 204, description: 'Delete campaign.' })
    @ApiResponse({ status: 404, description: 'Reqested data not found.' })
    async deleteCampaign(@Param('id') id: string): Promise<void> {
        if (!isValidObjectId(id)) {
            throw new BadRequestException(['Invalid id on url']);
        }
        const campaign = await this.campaignsService.deleteCampaign(new ObjectId(id));
        if (!campaign) {
            throw new NotFoundException();
        }
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'Get campaign.', type: CampaignDto })
    @ApiResponse({ status: 404, description: 'Reqested data not found.' })
    async getCampaign(@Param('id') id: string): Promise<any> {
        if (!isValidObjectId(id)) {
            throw new BadRequestException(['Invalid id on url']);
        }
        const campaign = await this.campaignsService.getCampaign(new ObjectId(id));
        if (!campaign) {
            throw new NotFoundException();
        }
        return campaign;
    }

    @Get()
    @ApiResponse({ status: 200, description: 'Get campaign list.', type: CampaignListDto })
    async getCampaignList(): Promise<CampaignListDto> {
        return this.campaignsService.getCampaignList();
    }
}
