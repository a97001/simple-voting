import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDefined, IsMongoId, Validate } from "class-validator";
import validid from 'validid';
import { IsHkid } from "../../shared/custom-validators/is-hkid";

export class CreateVoteDto {
    @ApiProperty()
    @IsDefined()
    @IsMongoId()
    campaignId: string;

    @ApiProperty()
    @IsDefined()
    @IsMongoId()
    candidateId: string;

    @ApiProperty()
    @IsDefined()
    @Validate(IsHkid)
    @Transform(s => validid.utils.normalize(s))
    hkid: string;
}