import {Controller,Body,Get,Post,Put,Delete,Param,HttpCode,HttpStatus,
    ParseIntPipe, ParseEnumPipe} from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserSaveDto } from './dto/requests/user.save-dto.js';
import { UserDto } from './dto/responses/user.dto.js';
import { RoomService } from '../room/room.service.js';
import { Room } from '../room/room.entity.js';
import { User } from './user.entity.js';
//http://local_host:3000/user
@Controller('user')
class UserController{
    constructor(
        private readonly service: UserService,
        private readonly roomService: RoomService,
    ){}
    //1. Http-request to create a new user
    @Post('create_user')
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() userSaveDto: UserSaveDto): Promise<UserDto>{
        return await this.service.createUser(userSaveDto);
    }
    //2. Http-request to get all active users:
    @Get()
    async getActiveUsers(): Promise<UserDto[]>{
        return await this.service.findAllActiveUsers();
    }
    //3. Http-request to get the information about a user with the specific id
    @Get(':id')
    async getUserById(@Param('id',ParseIntPipe) id: number): Promise<UserDto>{
        return await this.service.findUserById(id);
    }
    //4. to delete user with a specific id:
    @Delete(':id/delete_user')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteUserById(@Param('id',ParseIntPipe) id: number): Promise<void>{
        await this.service.deleteById(id);
    }
    //to restore an unactive user:
    @Put(':id/restore_user')
    @HttpCode(HttpStatus.NO_CONTENT)
    async restoreUserById(@Param('id',ParseIntPipe) id: number): Promise<void>{
        await this.service.restoreById(id);
    }
    @Put(':idUser/book_room/:idRoom')
    async bookAndAssignRoomToUser(
        @Param('idUser',ParseIntPipe) idUser: number,
        @Param('idRoom',ParseIntPipe) idRoom: number,
    ): Promise<UserDto>{
        const roomEntity: Room = await this.roomService.findEntityById(idRoom);
        const userEntity: User = await this.service.findEntityById(idUser);
        const isUserEligible: boolean = await this.service.checkEligibilityUser(userEntity);
        const isRoomAvailable: boolean = await this.roomService.checkRoomAvailability(roomEntity);
        if (isUserEligible && isRoomAvailable){
            await this.roomService.bookRoom(roomEntity);
            
        }
        return await this.service.setAvailableRoomToActiveUser(userEntity, roomEntity);
        
    }
    @Put(':idUser/cancel_reservation')
    @HttpCode(HttpStatus.NO_CONTENT)
    async cancelReservation(
        @Param('idUser',ParseIntPipe) idUser: number
    ): Promise<void>{
        const userEntity: User = await this.service.findEntityById(idUser);
        if(!userEntity.room){
            throw new Error(`The user with id ${idUser} has no revervation.`);
        }
        await this.roomService.setRoomFrei(userEntity.room.id);
        await this.service.setRoomToNull(idUser);
    }
}
export {UserController};