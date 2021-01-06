import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { CreateVoteDto } from "../dtos/create-vote-dto";
import { Vote } from "../models/vote";

@Injectable()
export class VotesRepository {
    constructor(
        @InjectModel(Vote) private readonly voteModel: ReturnModelType<typeof Vote>,
    ) {}

    public async createVote(voteDto: CreateVoteDto): Promise<void> {
        const voteDoc = new this.voteModel(voteDto);
        await voteDoc.save();
    }
}
