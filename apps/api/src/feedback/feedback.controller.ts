import { Body, Controller, Logger, NotFoundException, Param, Post, Req, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/authz/jwt.guard";
import { FeedbackService } from "./feedback.service";
import { FeedbackKind } from "@prisma/client";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UpdateFeedbackDto } from "./feedback.entity";

@Controller("feedback")
@ApiTags("default")
export class FeedbackController {
  private readonly logger: Logger;
  constructor(private readonly feedbackService: FeedbackService) {
    this.logger = new Logger(FeedbackController.name);
  }

  @Post("good/:postId")
  @ApiOperation({ summary: "Change good feedback", operationId: "updateGoodFeedback" })
  @UseGuards(JwtGuard)
  @ApiBearerAuth("access-token")
  addGood(@Req() req: any, @Param("postId") postId: string, @Body() state: UpdateFeedbackDto) {
    if (!req.user.user) {
      throw new NotFoundException("User not found");
    }

    if (state.flag) {
      this.feedbackService.createFeedback(postId, req.user.user.id, FeedbackKind.GOOD);
    } else {
      this.feedbackService.deleteFeedback(postId, req.user.user.id, FeedbackKind.GOOD);
    }
    return "ok";
  }

  @Post("cheer/:postId")
  @ApiOperation({ summary: "Change cheer feedback", operationId: "updateCheerFeedback" })
  @UseGuards(JwtGuard)
  @ApiBearerAuth("access-token")
  addCheer(@Req() req: any, @Param("postId") postId: string, @Body() state: UpdateFeedbackDto) {
    if (!req.user.user) {
      throw new NotFoundException("User not found");
    }

    if (state.flag) {
      this.feedbackService.createFeedback(postId, req.user.user.id, FeedbackKind.CHEER);
    } else {
      this.feedbackService.deleteFeedback(postId, req.user.user.id, FeedbackKind.CHEER);
    }
    return "ok";
  }
}
