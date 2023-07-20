import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { User } from "./auth.entity";
import { Tag } from "./tag.entity";

@Entity('post')

export class Post extends AbstractEntity {
    @Column({ name: 'title' })
    title: string

    @Column({ type: 'longtext' })
    body: string

    @Column()
    slug: string

    @Column()
    thumbnail: string

    @ManyToOne(() => User, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    author: User

    @ManyToMany(() => Tag, tag => tag.posts, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinTable({
        name: 'tag_post',
        joinColumn: {
            name: "post_id",
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: "tag_id",
            referencedColumnName: 'id'
        }
    })
    tags: Tag[]
}