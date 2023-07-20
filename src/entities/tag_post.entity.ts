import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Post } from "./post.entity";
import { Tag } from "./tag.entity";

@Entity('tag_post')

export class TagPost {
    @Column({ name: 'tag_id' })
    tagId: string
    @Column({ name: 'post_id' })
    postId: string

    @ManyToOne(() => Post, post => post.tags, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({
        name: 'post_id', referencedColumnName: 'id'
    })
    posts: []

    @ManyToOne(() => Tag, tag => tag.posts, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({
        name: 'tag_id', referencedColumnName: 'id'
    })
    tags: []
}