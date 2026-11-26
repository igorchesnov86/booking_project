import { Module } from '@nestjs/common';
import { RoomModule } from './modules/room/room.module.js';
import { DBModule } from './utils/db.js';
import { UserModule } from './modules/user/user.module.js';


@Module({
  imports: [RoomModule,DBModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

// import { Module } from '@nestjs/common';
// import {CarsModule} from './modules/cars/cars.module.js';
// import {PoliciesModule} from './modules/policies/policies.module.js';
// import {UserModule} from './modules/users/users.module.js';
// import {DBModule} from './utils/db.js';

// @Module({
//   imports: [CarsModule,PoliciesModule,UserModule, DBModule],
// })
// export class AppModule {}