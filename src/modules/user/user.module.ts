import {Module} from '@nestjs/common';
import { UserMapper } from './dto/user.mapper.js';
import {RoomMapper} from '../room/dto/room.mapper.js';

@Module({
    imports:[RoomMapper],
    providers: [],
    controllers: [],
    exports: [],
})
export class UserModule{}
