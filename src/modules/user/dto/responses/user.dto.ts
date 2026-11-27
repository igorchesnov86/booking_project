import { RoomDto } from "../../../room/dto/responses/room.dto.js";

export class UserDto{
    id: number;
    name: string;
    email: string;
    phone: string;
    room: RoomDto|null;
}