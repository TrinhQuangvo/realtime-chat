import { CreateDateColumn, PrimaryGeneratedColumn, } from "typeorm";
import { Exclude } from 'class-transformer';

export abstract class AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", name: 'created_at' })
    @Exclude()
    public createdAt: Date;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)", name: 'updated_at' })
    @Exclude()
    public updatedAt: Date;
}