import { Test, TestingModule } from '@nestjs/testing';
import { PostrgreSqlRepositoryService } from './postrgre-sqlrepository.service';

describe('PostrgreSqlrepositoryService', () => {
  let service: PostrgreSqlRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostrgreSqlRepositoryService],
    }).compile();

    service = module.get<PostrgreSqlRepositoryService>(
      PostrgreSqlRepositoryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
