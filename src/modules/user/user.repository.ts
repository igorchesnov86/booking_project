import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from './user.entity.js';

@Injectable()
class UserRepository{
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
    ){}
    async save(user: User): Promise<User>{
        return this.repository.save(user);
    }
    async findAllActiveUsers(): Promise<User[]>{
        return this.repository.find({
            where:{active: true},
            relations: {room: true}
        });
    }
    async findUserById(id: number): Promise<User|null>{
        return this.repository.findOneBy({id});
    }
    async deleteById(id: number): Promise<void> {
        await this.repository.delete(id);
    }
   
}
export {UserRepository};