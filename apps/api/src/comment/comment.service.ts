import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCommentDto } from "./comment.entity";
import { User } from "@prisma/client";
import { Comment } from "@prisma/client";

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async createComment(createCommentDto: CreateCommentDto, user: User): Promise<Comment> {
    return await this.prisma.comment.create({
      data: {
        content: createCommentDto.content,
        post: {
          connect: {
            id: createCommentDto.postId,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }
}
