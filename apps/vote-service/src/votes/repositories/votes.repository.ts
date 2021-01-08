import { Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { CreateVoteDto } from "../dtos/create-vote-dto";
import { Vote } from "../models/vote";

@Injectable()
export class VotesRepository {
    constructor(
        @InjectModel(Vote) private readonly voteModel: ReturnModelType<typeof Vote>,
    ) { }

    public async createVote(voteDto: CreateVoteDto): Promise<Vote> {
        const voteDoc = new this.voteModel(voteDto);
        voteDoc.createdAt = new Date();
        try {
            await voteDoc.save();
            return voteDoc;
        } catch (err) {
            throw new RpcException({ statusCode: 400, message: ['Already vote for campaign'] });
        }
    }
}
