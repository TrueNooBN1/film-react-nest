import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { PostrgreSqlRepositoryService } from './../../src/repository/PostrgreSQLRepository/postrgre-sqlrepository.service';
import { FILM_REPOSITORY_SERVICE } from './../../src/repository/repository.interface';

describe('FilmsService', () => {
  let service: FilmsService;
  let filmRepository: PostrgreSqlRepositoryService;

  beforeEach(async () => {
    filmRepository = {
      getFilms: jest.fn(), 
      getFilmSchedule: jest.fn(), 
    } as unknown as PostrgreSqlRepositoryService;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: FILM_REPOSITORY_SERVICE,
          useValue: filmRepository,
        }
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
