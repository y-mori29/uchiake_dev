import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SubQuestionDto } from "./sub-question.entity";

@Injectable()
export class SubQuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async list(): Promise<SubQuestionDto[]> {
    return await this.prisma.subQuestion.findMany({
      select: {
        id: true,
        order: true,
        content: true,
        description: true,
        minimum: true,
      },
      orderBy: { order: "asc" },
    });
  }
}
