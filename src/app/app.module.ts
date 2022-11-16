import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import {ConfigModule,ConfigService} from '@nestjs/config';
import config from '../config';
import {SequelizeModule} from "@nestjs/sequelize";

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load:[config]
  }),
    SequelizeModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService: ConfigService)=>({
        dialect: "postgres",
        host: configService.get('db_host'),
        port: configService.get('db_port'),
        username: configService.get('db_user'),
        database:configService.get('db_name'),
        password:configService.get('db_password'),
        synchronize:true,
        autoLoadModels:true,
        models:[]
      })
    }),
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
