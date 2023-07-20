import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { Post } from "./post.entity";

@Entity('tag')

export class Tag extends AbstractEntity {

    @Column()
    name: string

    @Column()
    slug: string

    @ManyToMany(() => Post, post => post.tags, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    posts: Post[]
}