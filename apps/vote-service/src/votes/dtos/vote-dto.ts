import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class VoteDto {
    @ApiProperty()
    campaignId: string;

    @ApiProperty()
    candidateId: string;

    @ApiProperty()
    @Transform(s => new Date(s))
    createdAt: Date;
}
