import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { HttpModule } from '@nestjs/axios';
import { PromosModule } from './promos/promos.module';
import { PromosService } from './promos/promos.service';
@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: `${process.env.db_postgres_host}`,
      port: parseInt(`${process.env.db_postgres_port}`),
      username: `${process.env.db_postgres_user}`,
      password: `${process.env.db_postgres_pass}`,
      database: `${process.env.db_postgres_db}`,
      autoLoadModels: true,
      synchronize: true,
    }),
    HttpModule,
    PromosModule,
  ],
  controllers: [AppController],
  providers: [AppService, PromosService],
})
export class AppModule {}
