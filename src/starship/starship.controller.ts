import {Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe} from '@nestjs/common';
import { StarshipService } from './starship.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import {Starship} from "./entities/starship.entity";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {DeleteResult} from "typeorm";

@ApiTags('starships')
@ApiBearerAuth()
@Controller({ path: '/starships', version: '1' })
export class StarshipController {
  constructor(private readonly starshipService: StarshipService) {}

  @Post()
  create(@Body() createStarshipDto: CreateStarshipDto) {
    return this.starshipService.create(createStarshipDto);
  }

  @Get()
  findAll() {
    return this.starshipService.findAll();
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

// findAll(): Starship[] {
//   const starshipsJSON = [
//     {
//       name: 'Apollo',
//       speed: 38999,
//       kilometerPrice: 9999,
//     },
//     {
//       name: 'SpaceX Starship',
//       speed: 26999,
//       kilometerPrice: 249999,
//     },
//     {
//       name: 'Sonde Parker',
//       speed: 531999,
//       kilometerPrice: 49999,
//     },
//   ]
//
//   const starships: Starship[] = Object.assign(new Array<Starship>(), starshipsJSON);
//
//   return starships;
// }