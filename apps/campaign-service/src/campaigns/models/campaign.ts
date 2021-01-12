import { ObjectId } from "mongodb";
import { index, prop } from '@typegoose/typegoose';
import { PaginatedModel, PaginateMethod } from "./paginated-model";

class CampaignCandidate {
    _id: ObjectId;

    @prop({ required: true })
    name: string;

    @prop({ default: 0 })
    voteCnt: number = 0;
}

@index({ endAt: -1 , totalVoteCnt: -1 })
export class Campaign extends PaginatedModel {
    _id: ObjectId;

    @prop({ required: true })
    title: string;

    @prop({ required: true })
    startAt: Date;

    @prop({ required: true })
    endAt: Date;

    createdAt: Date;

    updatedAt: Date;

    @prop({ type: [CampaignCandidate], required: true })
    candidates: CampaignCandidate[]

    @prop({ default: 0 })
    totalVoteCnt: number = 0;

    __v: number;

    @prop({ default: false })
    isVoting: boolean;

    static paginate: PaginateMethod<Campaign>;

    static aggregatePaginate: PaginateMethod<Campaign>;
}
