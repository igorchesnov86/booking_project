import {Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity.js';
import { RoomRepository } from './room.repository.js';
import { RoomMapper } from './dto/room.mapper.js';
import { RoomService } from './room.service.js';

@Module({
    imports:[TypeOrmModule.forFeature([Room])],
    providers:[RoomRepository, RoomMapper, RoomService],
    controllers:[],
    exports:[]
})
class RoomModule{

}
export {RoomModule};