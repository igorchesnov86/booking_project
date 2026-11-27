import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import { Room } from '../room/room.entity.js';

@Entity()
class User{
    @PrimaryGeneratedColumn({name: 'id'})
    id: number;
    @Column({name: 'name',nullable: false, unique: false})
    name: string;
    @Column({name: 'email',nullable: false, unique: true})
    email: string;
    @Column({name: 'password',nullable: false, unique: false})
    password: string;
    @Column({name: 'phone',nullable: false, unique: true})
    phone: string;
    @OneToOne(() => Room,{eager: true,nullable:true})
    @JoinColumn()
    room: Room|null;
    @Column({name: 'status', nullable: false, unique: false})
    active: boolean;
}
export {User};