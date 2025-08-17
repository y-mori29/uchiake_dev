import { Controller, Get } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Question } from "./question.entity";

@Controller("question")
@ApiTags("default")
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  @ApiOperation({ summary: "Get all questions", operationId: "getQuestions" })
  @ApiResponse({
    status: 200,
    description: "Return all questions",
    type: [Question],
  })
  async getQuestions(): Promise<Question[]> {
    return await this.questionService.list();
  }
}
