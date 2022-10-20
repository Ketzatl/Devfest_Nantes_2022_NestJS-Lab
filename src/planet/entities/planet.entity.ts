import {Column, Entity} from "typeorm";
import {DefaultEntity} from "../../utils/default-entity";

@Entity({ name: 'planet' })
export class Planet extends DefaultEntity {

    @Column()
    name: string;

    @Column()
    distanceToEarth: number;
}
