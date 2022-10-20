import {Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe} from '@nestjs/common';
import { StarshipService } from './starship.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import {Starship} from "./entities/starship.entity";
import {ApiTags} from "@nestjs/swagger";
import {DeleteResult} from "typeorm";

@ApiTags('starships')
@Controller({ path: '/starships', version: '1' })
export class StarshipController {
  constructor(private readonly starshipService: StarshipService) {}

  @Post()
  create(@Body() createStarshipDto: CreateStarshipDto) {
    return this.starshipService.create(createStarshipDto);
  }

  findAll(): Starship[] {
    const starshipsJSON = [
      {
        name: 'Apollo',
        speed: 39000,
        kilometerPrice: 10000,
      },
      {
        name: 'SpaceX Starship',
        speed: 27000,
        kilometerPrice: 250000,
      },
      {
        name: 'Sonde Parker',
        speed: 532000,
        kilometerPrice: 50000,
      },
    ];

    const starships: Starship[] = Object.assign(new Array<Starship>(), starshipsJSON);

    return starships;
  }

  @Get(':uuid')
  findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string): Promise<Starship> {
    return this.starshipService.findOneByUuid(uuid);
  }

  @Patch(':uuid')
  update(
      @Param('uuid', new ParseUUIDPipe()) uuid: string,
      @Body() updateStarshipDto: UpdateStarshipDto,
  ): Promise<Starship> {
    return this.starshipService.update(uuid, updateStarshipDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid', new ParseUUIDPipe()) uuid: string): Promise<DeleteResult> {
    return this.starshipService.remove(uuid);
  }
}