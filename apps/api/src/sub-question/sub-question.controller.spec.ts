import { Test, TestingModule } from "@nestjs/testing";
import { SubQuestionController } from "./sub-question.controller";

describe("SubQuestionController", () => {
  let controller: SubQuestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubQuestionController],
    }).compile();

    controller = module.get<SubQuestionController>(SubQuestionController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
