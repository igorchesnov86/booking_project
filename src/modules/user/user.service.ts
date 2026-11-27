import {Injectable} from '@nestjs/common';
import { UserRepository } from './user.repository.js';
import { User } from './user.entity.js';
import { UserSaveDto } from './dto/requests/user.save-dto.js';
import { UserDto } from './dto/responses/user.dto.js';
import { UserMapper } from './dto/user.mapper.js';
import { Room } from '../room/room.entity.js';

@Injectable()

class UserService{
    constructor(
        private readonly repository: UserRepository,
        private readonly userMapper: UserMapper,
    ){}
    async createUser(userSaveDto: UserSaveDto): Promise<UserDto>{
        const user: User = this.userMapper.mapDtoToEntity(userSaveDto);
        user.active = true;
        user.room = null;
        await this.repository.save(user);
        return this.userMapper.mapEntityToDto(user);
    }
    async findAllActiveUsers(): Promise<UserDto[]>{
        const userList: User[] = await this.repository.findAllActiveUsers();
        return this.userMapper.mapEntityListToDtoList(userList);
    }
    async findEntityById(id: number): Promise<User>{
        const entity: User | null = await this.repository.findUserById(id);
        if (!entity) {
            throw new Error(`The user with id ${id} is not in the database`);
        }
        return entity;
    }
    async findUserById(id: number): Promise<UserDto>{
        return this.userMapper.mapEntityToDto(await this.findEntityById(id));
    }
    async deleteById (id: number): Promise<void>{
        const entity: User = await this.findEntityById(id);
        if (entity.active){
            entity.active = false;
            await this.repository.save(entity);
        }
    }
    async restoreById(id: number): Promise<void>{
        const entity: User = await this.findEntityById(id);
        if (!entity.active){
            entity.active = true;
            await this.repository.save(entity);
        }
    }
    async checkEligibilityUser(userEntity: User): Promise<boolean>{
        if (!userEntity.active){
            throw new Error(`There is no user with id ${userEntity.id}`);
        }
        if (userEntity.room){
            throw new Error(`The user with id ${userEntity.id} has already booked a room.`)
        }
        return true;
    }
    async setAvailableRoomToActiveUser(userEntity: User, roomEntity:Room): Promise<UserDto>{
        userEntity.room = roomEntity;
        await this.repository.save(userEntity);
        return this.userMapper.mapEntityToDto(userEntity);
    }
    async setRoomToNull(id: number): Promise<void>{
        const userEntity: User = await this.findEntityById(id);
        userEntity.room = null;
        await this.repository.save(userEntity);

    }
}

export {UserService};