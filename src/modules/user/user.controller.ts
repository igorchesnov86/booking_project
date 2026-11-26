import {Controller,Body,Get,Post,Put,Delete,Param,HttpCode,HttpStatus,
    ParseIntPipe, ParseEnumPipe} from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserSaveDto } from './dto/requests/user.save-dto.js';
import { UserDto } from './dto/responses/user.dto.js';
//http://local_host:3000/user
@Controller('user')
class UserController{
    constructor(
        private readonly service: UserService,
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
}
export {UserController};