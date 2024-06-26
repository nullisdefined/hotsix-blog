import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // serve-static
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist'), // '/client/dist'를 루트 디렉터리로 static 파일을 제공
    }),
    // typrorm
    TypeOrmModule.forRoot(typeORMConfig),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
