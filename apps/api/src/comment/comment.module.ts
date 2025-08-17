import { Module } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { NotificationModule } from "src/notification/notification.module";
import { PostModule } from "src/post/post.module";

@Module({
  imports: [PrismaModule, NotificationModule, PostModule],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [CommentService],
})
export class CommentModule {}
