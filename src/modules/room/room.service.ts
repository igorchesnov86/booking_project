import { Injectable } from "@nestjs/common";
import {Room} from './room.entity.js';
import {RoomSaveDto} from './dto/requests/room.save-dto.js';
import {RoomUpdateDto} from './dto/requests/room.update-dto.js';
import {RoomDto} from './dto/responses/room.dto.js';
import {RoomMapper} from './dto/room.mapper.js';
import { RoomRepository } from "./room.repository.js";

@Injectable()
class RoomService{
    constructor(
        private readonly repository: RoomRepository,
        private readonly mapper: RoomMapper,
    ){}
    async createRoom(roomSaveDto: RoomSaveDto): Promise<RoomDto>{
        const entity: Room = this.mapper.mapDtoToEntity(roomSaveDto);
        entity.isBooked = false;
        await this.repository.save(entity);
        return this.mapper.mapEntityToDto(entity);
    }

    async findEntityById(id: number): Promise<Room> {
        const entity: Room|null = await this.repository.findRoomById(id);
        if(!entity){
            throw new Error(`The Room with id ${id} doesn't exist!`);
        }
        return entity;
    }
    async findRoomById(id: number): Promise<RoomDto> {
        const entity: Room = await this.findEntityById(id);
        return this.mapper.mapEntityToDto(entity);
    }

    async findAllRooms(): Promise<RoomDto[]> {
        const entityList: Room[] = await this.repository.findAllRooms();
        return this.mapper.mapEntityListToDtoList(entityList);
    }

    async findAvailableRooms():Promise<RoomDto[]>{
        const entityList: Room[] = await this.repository.findAllAvailableRooms();
        return this.mapper.mapEntityListToDtoList(entityList);
    }

    async updatePriceById(id: number,roomUpdateDto: RoomUpdateDto): Promise<void>{
        const entity: Room = await this.findEntityById(id);
        entity.pricePerNight = roomUpdateDto.newPricePerNight;
        await this.repository.save(entity);
    }
    async bookRoomById(id: number): Promise<RoomDto>{
        const entity: Room = await this.findEntityById(id);
        if (entity.isBooked){
            throw new Error("This room is no longer available!");
        }
        entity.isBooked = true;
        await this.repository.save(entity);
        return this.mapper.mapEntityToDto(entity);
    }
    async setRoomFrei(id: number): Promise<void>{
        const entity: Room = await this.findEntityById(id);
        entity.isBooked = false;
        await this.repository.save(entity);
    }

    async deleteById(id:number): Promise<void>{
        const entity: Room = await this.findEntityById(id);
        if(entity.isBooked){
            throw new Error(`The room with id ${id} can't be deleted as it is booked.`);
        }
        await this.repository.deleteById(id);
    }
}
export {RoomService};
