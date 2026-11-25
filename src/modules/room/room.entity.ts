import {TYPE} from './enums/type.enum.js';
import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
class Room{
    @PrimaryGeneratedColumn({name:'id'})
    id: number;
    @Column({name: 'number',nullable: false, unique: true})
    number: number;
    @Column({name: 'number_of_rooms',nullable: false, unique: false})
    numberOfRooms: number;
    @Column({name: 'type',nullable: false, unique: false, type: 'enum',enum: TYPE})
    type: TYPE;
    @Column({name: 'price_per_night',nullable: false, unique: false})
    pricePerNight: number;
    @Column({name: 'is_booked',nullable: false, unique: false})
    isBooked: boolean;
}
export {Room};