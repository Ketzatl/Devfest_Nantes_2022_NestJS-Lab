import {ApiProperty, PartialType} from '@nestjs/swagger';
import { CreateBookingDto } from './create-booking.dto';
import {Expose} from "class-transformer";
import {IsNotEmpty, IsOptional, IsUUID} from "class-validator";

export class UpdateBookingDto extends PartialType(CreateBookingDto) {
    @ApiProperty()
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    @IsOptional()
    uuid: string;
}

