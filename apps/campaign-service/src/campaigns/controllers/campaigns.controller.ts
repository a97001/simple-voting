import { BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CampaignDto } from '../dtos/campaign-dto';
import { CampaignListDto } from '../dtos/campaign-list-dto';
import { CreateCampaignDto } from '../dtos/create-campaign-dto';
import { CampaignsService } from '../services/campaigns.service';
import { ObjectId } from 'mongodb';
import { isValidObjectId } from 'mongoose';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class CampaignsController {
    constructor(
        private readonly campaignsService: CampaignsService
    ) { }

    @MessagePattern({ cmd: 'createCampaign' })
    async createCampaign(createCampaignDto: CreateCampaignDto): Promise<CampaignDto> {
        return this.campaignsService.createCampaign(createCampaignDto);
    }

    // @Put()
    // async updateCampaign(): Promise<any> {
    //     return;
    // }

    @MessagePattern({ cmd: 'deleteCampaign' })
    async deleteCampaign(id: string): Promise<CampaignDto> {
        // if (!isValidObjectId(id)) {
        //     throw new BadRequestException(['Invalid id on url']);
        // }
        const campaign = await this.campaignsService.deleteCampaign(new ObjectId(id));
        return campaign;
    }

    @MessagePattern({ cmd: 'getCampaign' })
    async getCampaign(id: string): Promise<CampaignDto> {
        // if (!isValidObjectId(id)) {
        //     throw new BadRequestException(['Invalid id on url']);
        // }
        const campaign = await this.campaignsService.getCampaign(new ObjectId(id));
        // if (!campaign) {
        //     throw new NotFoundException();
        // }
        return campaign;
    }

    @MessagePattern({ cmd: 'getCampaignList' })
    async getCampaignList(): Promise<CampaignListDto> {
        return this.campaignsService.getCampaignList();
    }
}
