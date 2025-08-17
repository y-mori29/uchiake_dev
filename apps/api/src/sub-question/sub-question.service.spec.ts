import { Test, TestingModule } from "@nestjs/testing";
import { SubQuestionService } from "./sub-question.service";

describe("SubQuestionService", () => {
  let service: SubQuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubQuestionService],
    }).compile();

    service = module.get<SubQuestionService>(SubQuestionService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
