import { Module } from "@nestjs/common";
import { PostController } from "./post/post.controller";
import { PostModule } from "./post/post.module";
import { PrismaModule } from "./prisma/prisma.module";
import { CategoryModule } from "./category/category.module";
import { UserModule } from "./user/user.module";
import { QuestionModule } from "./question/question.module";
import { CategoryController } from "./category/category.controller";
import { UserController } from "./user/user.controller";
import { QuestionController } from "./question/question.controller";
import { AuthzModule } from "./authz/authz.module";
import { CommentModule } from "./comment/comment.module";
import { SubQuestionModule } from "./sub-question/sub-question.module";
import { HealthController } from "./health/health.controller";
import { SubPostModule } from "./sub-post/sub-post.module";
import { FeedbackModule } from "./feedback/feedback.module";
import { NotificationModule } from "./notification/notification.module";

@Module({
  imports: [
    PrismaModule,
    PostModule,
    CategoryModule,
    UserModule,
    QuestionModule,
    AuthzModule,
    CommentModule,
    SubQuestionModule,
    SubPostModule,
    FeedbackModule,
    NotificationModule,
  ],
  controllers: [PostController, CategoryController, UserController, QuestionController, HealthController],
  providers: [],
})
export class AppModule {}
