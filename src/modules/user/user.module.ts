import {Module} from '@nestjs/common';
import { UserMapper } from './dto/user.mapper.js';
import {RoomMapper} from '../room/dto/room.mapper.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity.js';
import { UserRepository } from './user.repository.js';
import { UserService } from './user.service.js';
import { RoomModule } from '../room/room.module.js';
import { UserController } from './user.controller.js';
@Module({
    imports:[TypeOrmModule.forFeature([User]),RoomModule],
    providers: [UserRepository,UserService,UserMapper],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule{}
