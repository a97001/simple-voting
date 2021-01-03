import { prop } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

export class Candidate {
    _id: ObjectId;

    @prop({ required: true })
    name: String;

    @prop({ default: 0 })
    voteCnt?: number = 0;
}
