import { CreateDateColumn, PrimaryGeneratedColumn, } from "typeorm";
import { Exclude } from 'class-transformer';

export abstract class AbstractEntity {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
    public id: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", name: 'created_at' })
    @Exclude()
    public createdAt: Date;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)", name: 'updated_at' })
    @Exclude()
    public updatedAt: Date;
}