import { Controller, Get } from "@nestjs/common";
import { SubQuestionService } from "./sub-question.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SubQuestionDto } from "./sub-question.entity";

@Controller("subQuestion")
@ApiTags("default")
export class SubQuestionController {
  constructor(private readonly subQuestionService: SubQuestionService) {}

  @Get()
  @ApiOperation({ summary: "Get all subQuestions", operationId: "getSubQuestions" })
  @ApiResponse({
    status: 200,
    description: "Return all subQuestions",
    type: [SubQuestionDto],
  })
  async getQuestions(): Promise<SubQuestionDto[]> {
    return await this.subQuestionService.list();
  }
}
