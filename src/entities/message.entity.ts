import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './auth.entity';
import { IsNotEmpty } from 'class-validator';


@Entity()
export class Message {
    @PrimaryGeneratedColumn('uuid')
    public id!: string;

    @Column()
    @IsNotEmpty()
    public content: string;

    @IsNotEmpty()
    @ManyToOne(() => User)
    public author: User;
}
