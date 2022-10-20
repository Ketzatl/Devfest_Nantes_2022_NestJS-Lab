import {Column, Entity} from "typeorm";
import {DefaultEntity} from "../../utils/default-entity";

@Entity({ name: 'starship' })
export class Starship extends DefaultEntity {

    @Column()
    name: string;

    @Column()
    speed: number;

    @Column()
    kilometerPrice: number;
}
