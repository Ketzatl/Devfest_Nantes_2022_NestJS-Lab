import {Injectable, NotFoundException} from '@nestjs/common';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import {Planet} from "./entities/planet.entity";
import {InjectRepository} from "@nestjs/typeorm";
import { Repository } from 'typeorm/repository/Repository';
import {DeleteResult} from "typeorm";

@Injectable()
export class PlanetService {

  constructor(
      @InjectRepository(Planet)
      private readonly planetRepository: Repository<Planet>,
  ) {}

  create(createPlanetDto: CreatePlanetDto): Promise<Planet> {
    return this.planetRepository.save(createPlanetDto);
  }

  findAll(): Promise<Planet[]> {
    return this.planetRepository.find();
  }

  // findAllv2(): Planet[] {
  //   const planetsJSON = [
  //     {
  //       name: 'Lune',
  //       distanceToEarth: 384400,
  //     },
  //     {
  //       name: 'Venus',
  //       distanceToEarth: 41400000,
  //     },
  //     {
  //       name: 'Mars',
  //       distanceToEarth: 78340000,
  //     },
  //     {
  //       name: 'Mercure',
  //       distanceToEarth: 91690000,
  //     },
  //     {
  //       name: 'Jupiter',
  //       distanceToEarth: 628730000,
  //     },
  //     {
  //       name: 'Saturne',
  //       distanceToEarth: 1275000000,
  //     },
  //     {
  //       name: 'Uranus',
  //       distanceToEarth: 2723950000,
  //     },
  //     {
  //       name: 'Neptune',
  //       distanceToEarth: 4351400000,
  //     },
  //   ];
  //
  //   const planets: Planet[] = Object.assign(new Array<Planet>(), planetsJSON);
  //
  //   return planets;
  // }

  findOneByUuid(uuid: string): Promise<Planet | null> {
    return this.planetRepository.findOneBy({ uuid });
  }

  async update(uuid: string, updatePlanetDto: UpdatePlanetDto): Promise<Planet> {
    const planet = await this.findOneByUuid(uuid);

    if (!planet) {
      throw new NotFoundException();
    }

    await this.planetRepository.save({ id: planet.id, ...updatePlanetDto });

    return this.findOneByUuid(uuid);
  }

  async remove(uuid: string): Promise<DeleteResult> {
    const planet = await this.findOneByUuid(uuid);

    if (!planet) {
      throw new NotFoundException();
    }

    return this.planetRepository.delete({ uuid });
  }
}
