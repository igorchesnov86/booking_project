import {forwardRef,Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity.js';
import { RoomRepository } from './room.repository.js';
import { RoomMapper } from './dto/room.mapper.js';
import { RoomService } from './room.service.js';
import { UserModule } from '../user/user.module.js';
import { RoomController } from './room.controller.js';

@Module({
    imports:[TypeOrmModule.forFeature([Room]),forwardRef(()=> UserModule)],
    providers:[RoomRepository, RoomMapper, RoomService],
    controllers:[RoomController],
    exports:[RoomMapper],
})
class RoomModule{

}
export {RoomModule};