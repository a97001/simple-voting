import { ObjectId } from "mongodb";
import { plugin, prop } from '@typegoose/typegoose';
import mongoosePaginate from 'mongoose-paginate-v2';

class CampaignCandidate {
    _id: ObjectId;

    @prop({ required: true })
    name: string;

    @prop({ default: 0 })
    voteCnt: number = 0;
}

@plugin(mongoosePaginate)
export class Campaign {
    _id: ObjectId;

    @prop({ required: true })
    title: string;

    @prop({ required: true })
    startAt: Date;

    @prop({ required: true })
    endAt: Date;

    @prop({ type: [CampaignCandidate], required: true })
    candidates: CampaignCandidate[]

    @prop({ default: 0 })
    totalVoteCnt: number = 0;
}
