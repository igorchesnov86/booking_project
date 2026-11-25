import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Room} from './room.entity.js';

@Injectable()
class RoomRepository{
    constructor(
        @InjectRepository(Room)
        private readonly repository: Repository<Room>,
    ){}
    //to add a new entity into the db or to update the existing one:
    async save(room:Room): Promise<Room> {
        return this.repository.save(room);
    }
    //find all rooms available in the db:
    async findAllRooms(): Promise<Room[]>{
        return this.repository.find({});
    }
    async findAllAvailableRooms(): Promise<Room[]> {
        return this.repository.findBy({isBooked: false});
    }
    async findRoomById(id: number): Promise<Room|null>{
        return this.repository.findOneBy({id});
    }
    async deleteById(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}
export {RoomRepository};