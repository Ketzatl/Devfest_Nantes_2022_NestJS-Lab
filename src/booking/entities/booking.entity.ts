import {DefaultEntity} from "../../utils/default-entity";
import {AfterLoad, Column, Entity, ManyToOne} from "typeorm";
import {Starship} from "../../starship/entities/starship.entity";
import {Planet} from "../../planet/entities/planet.entity";
import * as dayjs from 'dayjs';

@Entity({ name: 'booking' })
export class Booking extends DefaultEntity {

    // Le décorateur @ManyToOne permet de créer un lien entre l'entité Booking et les entités Planet et Starship.' +
    // ' Notons que les propriétés arrivalDate et price ne correspondent pas à des colonnes ' +
    // 'mais seront calculées (voir plus bas).

    @ManyToOne(() => Planet)
    destination: Planet;

    @ManyToOne(() => Starship)
    starship: Starship;

    @Column()
    traveller: string;

    @Column()
    departureDate: Date;

    arrivalDate: Date;

    price: number;

    // Ajoutons également les méthodes processTravelTime() et processPrice().
    // Elles sont appelées après le chargement d'une entité Booking et permettent ' +
    // 'd'alimenter les propriétés arrivalDate et price.

    @AfterLoad()
    processTravelTime() {
        if (this.destination?.distanceToEarth && this.starship?.speed) {
            const travelTime = this.destination.distanceToEarth / (this.starship.speed * 24);
            this.arrivalDate = new Date(dayjs(this.departureDate).add(travelTime, 'day').toISOString());
        }
    }

    @AfterLoad()
    processPrice() {
        if (this.destination?.distanceToEarth && this.starship?.kilometerPrice) {
            this.price = this.destination.distanceToEarth * this.starship.kilometerPrice;
        }
    }

}
