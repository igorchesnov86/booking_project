import {Injectable} from '@nestjs/common';
import { RoomSaveDto } from './requests/room.save-dto.js';
import { RoomDto } from './responses/room.dto.js';
import { Room } from '../room.entity.js';

@Injectable()
class RoomMapper{

    mapDtoToEntity (roomDto: RoomSaveDto): Room {
        const entity: Room = new Room();
        entity.number = roomDto.number;
        entity.numberOfRooms = roomDto.numberOfRooms;
        entity.type = roomDto.type;
        entity.pricePerNight = roomDto.pricePerNight;
        return entity;
    }
    mapEntityToDto(room: Room): RoomDto{
        if(!room){
            return new RoomDto()
        }
        let roomDto: RoomDto = new RoomDto();
        roomDto = {...roomDto, ...room}; 
        return roomDto;
    }
    mapEntityListToDtoList(entityList: Room[]): RoomDto[] {
        return entityList.map((entity: Room): RoomDto => this.mapEntityToDto(entity));
    }
}
export {RoomMapper};
