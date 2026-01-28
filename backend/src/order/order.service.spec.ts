import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { FILM_REPOSITORY_SERVICE } from './../../src/repository/repository.interface';
import { PostrgreSqlRepositoryService } from './../../src/repository/PostrgreSQLRepository/postrgre-sqlrepository.service';

describe('OrderService', () => {
  let service: OrderService;
  let filmRepository: PostrgreSqlRepositoryService;

  beforeEach(async () => {
    filmRepository = {
      postOrder: jest.fn(), 
    } as unknown as PostrgreSqlRepositoryService;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: FILM_REPOSITORY_SERVICE,
          useValue: filmRepository,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
