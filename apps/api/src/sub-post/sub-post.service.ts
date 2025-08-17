import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateSubPostDto } from "./create-subpost.dto";

@Injectable()
export class SubPostService {
  constructor(private readonly prisma: PrismaService) {}

  async createSubPost(createSubPostDto: CreateSubPostDto, userId: string): Promise<void> {
    await this.prisma.subPost.create({
      data: {
        title: createSubPostDto.title,
        post: {
          connect: {
            id: createSubPostDto.postId,
          },
        },
        subAnswers: {
          create: createSubPostDto.subAnswers.map((subAnswer) => {
            return {
              subQuestion: {
                connect: {
                  id: subAnswer.subQuestionId,
                },
              },
              content: subAnswer.content,
            };
          }),
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
}
