
import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Post } from './post.entity';
import { Exclude } from 'class-transformer';
import Role from 'src/enum/role.enum';

@Entity('user')
export class User extends AbstractEntity {
    @Column({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'last_name' })
    lastName: string;


    @Column({ name: 'email', length: 255, unique: true })
    email: string

    @Column({ name: 'avatar', type: 'longtext', nullable: true })
    avatar: string

    @Column({ name: 'role', default: Role.User })
    role: Role

    @Column({ nullable: true })
    @Exclude()
    currentHashedRefreshToken?: string;

    @Column()
    @Exclude()
    password: string

    @Column({ default: true, name: 'is_active' })
    isActive: boolean;

    @ManyToOne(() => Post, post => post.id)
    posts: []
}