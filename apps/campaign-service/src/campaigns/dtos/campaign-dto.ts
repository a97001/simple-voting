import { ApiResponseProperty } from "@nestjs/swagger";
import { Exclude, Transform } from "class-transformer";
import { ObjectId } from "mongodb";

class CampaignCandidateDto {
    @ApiResponseProperty({ type: String })
    _id: ObjectId;

    @ApiResponseProperty()
    name: string;

    @ApiResponseProperty()
    voteCnt: number;
}

export class CampaignDto {
    @ApiResponseProperty({ type: String })
    _id: ObjectId;

    @ApiResponseProperty()
    title: string;

    @ApiResponseProperty()
    @Transform(v => new Date(v))
    startAt: Date;

    @ApiResponseProperty()
    @Transform(v => new Date(v))
    endAt: Date;

    @ApiResponseProperty()
    @Transform(v => new Date(v))
    updatedAt: Date;

    @ApiResponseProperty()
    @Transform(v => new Date(v))
    createdAt: Date;

    @ApiResponseProperty({ type: [CampaignCandidateDto] })
    candidates: CampaignCandidateDto[]

    @ApiResponseProperty()
    totalVoteCnt: number;

    @Exclude()
    __v: number
}
