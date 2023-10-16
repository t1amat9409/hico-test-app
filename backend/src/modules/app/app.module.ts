import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from '../../modules/employees/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST || 'localhost',
      port: Number(process.env.TYPEORM_PORT) || 5433,
      username: process.env.TYPEORM_USER,
      password: process.env.TYPEORM_PWD,
      database: process.env.TYPEORM_DB,
      entities: ['src/entity/**/*.{ts,tsx,js,jsx}'],
      migrations: ['src/migration/**/*.{ts,tsx,js,jsx}'],
      subscribers: ['src/subscriber/**/*.{ts,tsx,js,jsx}'],
      synchronize: true,
    }),
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
