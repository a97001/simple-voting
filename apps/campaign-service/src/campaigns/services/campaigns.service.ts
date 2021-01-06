import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { CampaignDto } from '../dtos/campaign-dto';
import { CampaignListDto } from '../dtos/campaign-list-dto';
import { CreateCampaignDto } from '../dtos/create-campaign-dto';
import { Campaign } from '../models/campaign';
import { CampaignsRepository } from '../repositories/campaigns.repository';
import * as rdkafka from 'node-rdkafka';
import { ObjectId } from 'mongodb';
import { ConfigService } from '@nestjs/config';
import { VoteDto } from 'apps/vote-service/src/votes/dtos/vote-dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CampaignsService implements OnApplicationBootstrap {
    voteStream: rdkafka.ConsumerStream;

    constructor(
        private readonly configService: ConfigService,
        private readonly campaignsRepository: CampaignsRepository
    ) { }

    public async createCampaign(createCampaignDto: CreateCampaignDto): Promise<Campaign> {
        return this.campaignsRepository.createCampaign(createCampaignDto);
    }

    public async deleteCampaign(id: ObjectId): Promise<Campaign> {
        return this.campaignsRepository.deleteCampaign(id);
    }

    public async getCampaign(id: ObjectId): Promise<CampaignDto> {
        return this.campaignsRepository.getCampaignById(id);
    }

    public async getCampaignList(): Promise<CampaignListDto> {
        return this.campaignsRepository.getCampaignList();
    }

    public streamObjToVote(obj: any): VoteDto {
        return plainToClass(VoteDto, {
            campaignId: obj.campaignId.$oid,
            candidateId: obj.candidateId.$oid,
            createdAt: new Date(obj.createdAt.$date),
        });
    }

    public async onApplicationBootstrap(): Promise<void> {
        this.voteStream = rdkafka.KafkaConsumer.createReadStream({
            'group.id': 'VOTE_SERVICE',
            'metadata.broker.list': this.configService.get('ENV_KAFKA_BROKERS')
        }, {}, {
            topics: ['mongo.development.votes']
        });

        this.voteStream.on('data', async (message) => {
            console.log('Got message');
            const payload = JSON.parse(JSON.parse(message.value.toString()).payload);
            await this.campaignsRepository.updateCampaignVoteCnt(this.streamObjToVote(payload));
        });
    }
}
