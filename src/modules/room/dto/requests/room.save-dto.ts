import { TYPE } from "../../enums/type.enum.js";

export class RoomSaveDto {
    number: number;
    numberOfRooms: number;
    type: TYPE;
    pricePerNight: number;
}