import {TYPE} from '../../enums/type.enum.js';
export class RoomDto{
    id: number;
    number: number;
    numberOfRooms: number;
    type:TYPE;
    pricePerNight: number;
    isBooked: boolean;
}