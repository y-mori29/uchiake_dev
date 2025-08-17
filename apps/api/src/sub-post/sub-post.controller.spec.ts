import { Test, TestingModule } from '@nestjs/testing';
import { SubPostController } from './sub-post.controller';

describe('SubPostController', () => {
  let controller: SubPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubPostController],
    }).compile();

    controller = module.get<SubPostController>(SubPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
