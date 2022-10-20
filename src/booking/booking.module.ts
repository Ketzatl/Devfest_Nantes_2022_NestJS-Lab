import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import {PlanetModule} from "../planet/planet.module";
import {StarshipModule} from "../starship/starship.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Booking} from "./entities/booking.entity";

@Module({
  imports: [PlanetModule, StarshipModule, TypeOrmModule.forFeature([Booking])],
  controllers: [BookingController],
  providers: [BookingService]
})
export class BookingModule {}
