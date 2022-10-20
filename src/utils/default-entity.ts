
// Créons ensuite, dans src\utils\default-entity.ts, la classe DefaultEntity qui contient
// les propriétés communes à toutes les entités de notre application, à savoir :
//
//      id : un identifiant technique généré automatiquement par incrément
//      uuid : un identifiant métier unique au format UUID et généré automatiquement
//      active : un booléen indiquant si la ressource est active


// src/utils/default-entity.ts

import { Exclude } from "class-transformer";
import { Column, Generated, PrimaryGeneratedColumn } from "typeorm";

export class DefaultEntity {
    @Exclude()
    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column()
    active: boolean;

    @Column({ unique: true })
    @Generated("uuid")
    uuid: string;
}