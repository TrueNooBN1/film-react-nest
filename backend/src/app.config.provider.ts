import { ConfigModule } from '@nestjs/config';

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    database: {
      driver: process.env.DATABASE_DRIVER || 'mongodb',
      url: process.env.DATABASE_URL || 'mongodb://localhost:27017/prac',
      sqldatabase: {
        port: process.env.DATABASE_PORT || 5432,
        username: process.env.DATABASE_USER || 'student',
        password: process.env.DATABASE_PASSWORD || 'student',
      },
    },
  },
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
  sqldatabase: AppConfigSQLDatabase;
}
export interface AppConfigSQLDatabase {
  port: number;
  username: string;
  password: string;
}
