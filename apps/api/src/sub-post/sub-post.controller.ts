import { Body, Controller, NotFoundException, Post, Req, UseGuards } from "@nestjs/common";
import { SubPostService } from "./sub-post.service";
import { CreateSubPostDto } from "./create-subpost.dto";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "src/authz/jwt.guard";
import { PostService } from "src/post/post.service";

@Controller("sub-post")
@ApiTags("default")
export class SubPostController {
  constructor(
    private readonly subPostService: SubPostService,
    private readonly postService: PostService,
  ) {}

  @Post()
  @ApiOperation({ summary: "Create a new sub-post", operationId: "createSubPost" })
  @ApiResponse({
    status: 201,
    description: "Create a new sub-post",
    type: String,
  })
  @UseGuards(JwtGuard)
  @ApiBearerAuth("access-token")
  async createSubPost(@Req() req: any, @Body() createSubPostDto: CreateSubPostDto): Promise<string> {
    if (!req.user.user) {
      throw new NotFoundException("user not found");
    }

    const post = await this.postService.getPostByIdAndUserId(createSubPostDto.postId, req.user.user.id);
    if (!post) {
      throw new NotFoundException("post not found");
    }

    await this.subPostService.createSubPost(createSubPostDto, req.user.user.id);
    return "ok";
  }
}
