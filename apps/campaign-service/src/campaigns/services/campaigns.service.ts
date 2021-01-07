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

    private streamObjToVote(obj: any): VoteDto {
        return plainToClass(VoteDto, {
            campaignId: obj.campaignId.$oid,
            candidateId: obj.candidateId.$oid,
            createdAt: new Date(obj.createdAt.$date),
        });
    }

    private async initVoteStream(): Promise<void> {
        const client = rdkafka.AdminClient.create({
            'client.id': 'VOTE_SERVICE',
            'metadata.broker.list': this.configService.get('ENV_KAFKA_BROKERS')
        });
        await new Promise((resolve) => {
            client.createTopic({
                topic: 'mongo.development.votes',
                num_partitions: 1,
                replication_factor: 1
            }, () => {
                console.log('create stream');
                this.runVoteStream();
                resolve(true);
            });
        });
        client.disconnect();
    }

    private runVoteStream(): void {
        console.log('run stream');
        this.voteStream = rdkafka.KafkaConsumer.createReadStream({
            'group.id': 'VOTE_SERVICE',
            'metadata.broker.list': this.configService.get('ENV_KAFKA_BROKERS')
        }, {}, {
            topics: ['mongo.development.votes']
        });

        this.voteStream.on('data', async (message) => {
            const payload = JSON.parse(JSON.parse(message.value.toString()).payload);
            await this.campaignsRepository.updateCampaignVoteCnt(this.streamObjToVote(payload));
        });
    }

    public async onApplicationBootstrap(): Promise<void> {
        await this.initVoteStream();
        
    }
}
