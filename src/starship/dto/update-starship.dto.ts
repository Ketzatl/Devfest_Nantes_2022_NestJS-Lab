import {ApiProperty, PartialType} from '@nestjs/swagger';
import { CreateStarshipDto } from './create-starship.dto';
import {Expose} from "class-transformer";
import {IsNotEmpty, IsOptional, IsUUID} from "class-validator";

export class UpdateStarshipDto extends PartialType(CreateStarshipDto) {

    @ApiProperty()
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    @IsOptional()
    uuid: string;
}
