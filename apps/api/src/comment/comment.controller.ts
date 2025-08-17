import { Body, Controller, Logger, Post, Request, UseGuards } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateCommentDto } from "./comment.entity";
import { JwtGuard } from "src/authz/jwt.guard";
import { NotificationService } from "src/notification/notification.service";
import { PostService } from "src/post/post.service";

@Controller("comment")
@ApiTags("default")
export class CommentController {
  private readonly logger = new Logger(CommentController.name);

  constructor(
    private readonly commentService: CommentService,
    private readonly notificationService: NotificationService,
    private readonly postService: PostService,
  ) {}

  @Post()
  @ApiOperation({ summary: "Create comment", operationId: "createComment" })
  @ApiResponse({
    status: 201,
    description: "Create comment",
    type: String,
  })
  @UseGuards(JwtGuard)
  @ApiBearerAuth("access-token")
  async createComment(@Request() req: any, @Body() content: CreateCommentDto): Promise<string> {
    if (!req.user.user) {
      throw new Error("User not found");
    }

    const comment = await this.commentService.createComment(content, req.user.user);
    const postWithUserId = await this.postService.getPostWithUserId(comment.postId);

    if (!postWithUserId) {
      this.logger.error(`Post not found: ${comment.postId}`, new Error());
      return "ok";
    }

    this.notificationService.createNotification(postWithUserId.user.id, comment.id);
    return "ok";
  }
}
