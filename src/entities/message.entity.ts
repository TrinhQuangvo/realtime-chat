import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './auth.entity';
import { IsNotEmpty } from 'class-validator';
import { AbstractEntity } from './abstract.entity';


@Entity()
export class Message extends AbstractEntity {

    @Column()
    @IsNotEmpty()
    public content: string;

    @IsNotEmpty()
    @ManyToOne(() => User)
    public author: User;
}
