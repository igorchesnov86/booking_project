import {Controller,Body,Get,Post,Put,Delete,HttpCode,HttpStatus,
    Param,ParseIntPipe,ParseEnumPipe} from '@nestjs/common';
import { RoomService } from './room.service.js';
import { RoomSaveDto } from './dto/requests/room.save-dto.js';
import { RoomDto } from './dto/responses/room.dto.js';
import { RoomUpdateDto } from './dto/requests/room.update-dto.js';
import { Room } from './room.entity.js';



@Controller('room')
class RoomController{
    constructor (
        private readonly service: RoomService
    ){}
    //1. request to make a new entry:
    @Post('create_room')
    @HttpCode(HttpStatus.CREATED)
    async createRoom(@Body() roomSaveDto: RoomSaveDto): Promise<RoomDto>{
        return await this.service.createRoom(roomSaveDto);
    }

    //2. request to get all available rooms:
    @Get()
    async getAllAvailableRooms(): Promise<RoomDto[]>{
        return await this.service.findAvailableRooms();
    }

    //3. request to get a room with id:
    @Get(':id')
    async getRoomById(@Param('id',ParseIntPipe) id: number): Promise<RoomDto>{
        return await this.service.findRoomById(id);
    }

    //4. request to update the property pricePerNight:
    @Put(':id/update_price')
    @HttpCode(HttpStatus.NO_CONTENT)
    async updatePriceByUserId(
        @Param('id',ParseIntPipe) id: number,
        @Body() roomUpdateDto: RoomUpdateDto,
    ): Promise<void>{
        await this.service.updatePriceById(id,roomUpdateDto);
    }

    //5. request to book the room and assign it to the user :
    // @Put(':idRoom/book_room/:idUser')
    // ////////////////////////////////////////
    // //@HttpCode(HttpStatus.NO_CONTENT)
    // async bookRoomById(
    //     @Param('idRoom',ParseIntPipe) idRoom: number,
    //     @Param('idUser',ParseIntPipe) idUser: number,
    // ): Promise<UserDto>{
    //     const availableRoom: Room = await this.service.checkRoomAvailability(idRoom);
    //     const eligibleUser: User = await this.userService.checkEligibilityUser(idUser);
    //     await this.service.bookRoom(availableRoom);
    //     return await this.userService.setAvailableRoomToActiveUser(eligibleUser,availableRoom);
    // }
}
export {RoomController}