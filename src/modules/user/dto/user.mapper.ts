import {Injectable} from '@nestjs/common';
import { User } from '../user.entity.js';
import { UserSaveDto } from './requests/user.save-dto.js';
import { UserDto } from './responses/user.dto.js';
import {RoomMapper} from '../../room/dto/room.mapper.js';

@Injectable()
class UserMapper{
    constructor(
        private readonly roomMapper: RoomMapper,
    ){}
    mapDtoToEntity (userSaveDto: UserSaveDto): User {
        let entity: User = new User();
        entity = {...entity, ...userSaveDto};
        return entity;
    }
    mapEntityToDto(user: User): UserDto {
        let userDto: UserDto = new UserDto();
        userDto.id = user.id;
        userDto.name = user.name;
        userDto.email = user.email;
        userDto.phone = user.phone;
        userDto.room = this.roomMapper.mapEntityToDto(user.room);
        return userDto;
    }
    mapEntityListToDtoList(entityList: User[]): UserDto[]{
        return entityList.map((entity: User): UserDto => this.mapEntityToDto(entity));
    }
}
export {UserMapper};