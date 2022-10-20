import {ApiProperty, PartialType} from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CreatePlanetDto } from './create-planet.dto';
import {IsNotEmpty, IsOptional, IsUUID} from "class-validator";

export class UpdatePlanetDto extends PartialType(CreatePlanetDto) {

    @ApiProperty()
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    @IsOptional()
    uuid: string;
}
