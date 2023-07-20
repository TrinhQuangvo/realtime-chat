import { Column, Entity } from "typeorm";
import { AbstractEntity } from "./abstract.entity";

@Entity('Roles')

export class Roles extends AbstractEntity {
    @Column({ unique: true, length: 255 })
    name: string
}