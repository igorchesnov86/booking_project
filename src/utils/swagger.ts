import { INestApplication } from '@nestjs/common';
import {DocumentBuilder,SwaggerModule} from '@nestjs/swagger';
const swaggerConfig = new DocumentBuilder()
.setTitle("Booking_app API") //title for the API of the product
.setDescription("Backend API for the booking project")
.setVersion("1.0")
.build();

//we will see 'document' in the website
const createSwaggerDocument =  (app: INestApplication) => SwaggerModule.createDocument(app, swaggerConfig);
export {createSwaggerDocument};