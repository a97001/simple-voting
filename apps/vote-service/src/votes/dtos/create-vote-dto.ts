import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDefined, IsMongoId, Validate } from "class-validator";
import validid from 'validid';
import { IsHkid } from "../../shared/custom-validators/is-hkid";
import crypto from 'crypto';

export class CreateVoteDto {
    @ApiProperty()
    @IsDefined()
    @IsMongoId()
    campaignId: string;

    @ApiProperty()
    @IsDefined()
    @IsMongoId()
    candidatesId: Date;

    @ApiProperty()
    @IsDefined()
    @Validate(IsHkid)
    @Transform(s => crypto.createHash('sha256').update(validid.normalize(s)).digest('base64'))
    hkid: string;
}