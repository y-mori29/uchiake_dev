import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Question } from "./question.entity";

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async list(): Promise<Question[]> {
    return await this.prisma.question.findMany({
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
