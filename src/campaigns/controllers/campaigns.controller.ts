import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CampaignsService } from '../services/campaigns.service';

@Controller('campaigns')
export class CampaignsController {
    constructor(
        private readonly campaignsService: CampaignsService
    ) { }

    @Post()
    async createCampaign(): Promise<any> {
        return;
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
