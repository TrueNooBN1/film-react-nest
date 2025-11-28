import { Module } from '@nestjs/common';
import { MongoRepositoryService } from '../repository/MongoRepository/mongorepository.service';
import { FILM_REPOSITORY_SERVICE } from '../repository/repository.interface';
import { MongooseModule } from '@nestjs/mongoose';
import { configProvider } from '../app.config.provider';
import { filmSchema, Film } from '../films/schemas/films.schema';

export enum DBMS {
  MongoDB = 'mongodb',
  PostgreSQL = 'PostgreSQL',
}

@Module({})
export class DatabaseModule {
  static register(dbms: string) {
    const providers = [];
    const imports = [];
    const exports = [];

    providers.push(configProvider);

    switch (dbms) {
      case DBMS.MongoDB:
      default:
        providers.push({
          provide: FILM_REPOSITORY_SERVICE,
          useClass: MongoRepositoryService,
        });
        imports.push(
          MongooseModule.forRoot(configProvider.useValue.database.url),
          MongooseModule.forFeature([{ name: Film.name, schema: filmSchema }]),
        );
        break;
    }
    exports.push(FILM_REPOSITORY_SERVICE);
    return {
      module: DatabaseModule,
      imports,
      providers,
      exports,
    };
  }
}
