import { Injectable, Logger } from "@nestjs/common";
import { FeedbackKind } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class FeedbackService {
  private readonly logger: Logger;

  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(FeedbackService.name);
  }

  createFeedback(postId: string, userId: string, kind: FeedbackKind) {
    this.prisma.feedback
      .create({
        data: {
          post: { connect: { id: postId } },
          user: { connect: { id: userId } },
          kind,
        },
      })
      .catch((e) => {
        this.logger.error(e);
        if (e.code === "P2002") {
          return;
        }
      });
  }

  deleteFeedback(postId: string, userId: string, kind: FeedbackKind) {
    this.prisma.feedback
      .delete({
        where: {
          userId_postId_kind: {
            postId,
            userId,
            kind,
          },
        },
      })
      .catch((e) => {
        this.logger.error(e);
        if (e.code === "P2025") {
          return;
        }
      });
  }
}
