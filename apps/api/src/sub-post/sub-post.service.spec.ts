import { Test, TestingModule } from '@nestjs/testing';
import { SubPostService } from './sub-post.service';

describe('SubPostService', () => {
  let service: SubPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubPostService],
    }).compile();

    service = module.get<SubPostService>(SubPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
