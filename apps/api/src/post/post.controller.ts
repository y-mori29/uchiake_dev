import { Body, Controller, Get, Logger, NotFoundException, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto, PostDetail, PostPreview } from "./post.entity";
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "src/authz/jwt.guard";
import { OptionalJwtGuard } from "src/authz/optionalJwt.guard";

@Controller("post")
@ApiTags("default")
export class PostController {
  private readonly logger = new Logger(PostController.name);
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiOperation({ summary: "Create a new post", operationId: "createPost" })
  @ApiResponse({
    status: 201,
    description: "Create a new post",
    type: String,
  })
  @UseGuards(JwtGuard)
  @ApiBearerAuth("access-token")
  async createPost(@Req() req: any, @Body() createPostDto: CreatePostDto): Promise<string> {
    if (!req.user.user) {
      throw new NotFoundException("user not found");
    }
    await this.postService.createPost(createPostDto, req.user.user);
    return "ok";
  }

  @Get("/previews")
  @ApiOperation({ summary: "Get all posts", operationId: "getPostPreviews" })
  @ApiQuery({
    name: "createdAt",
    required: false,
    description: "Get posts created after this date",
    type: String,
  })
  @ApiQuery({
    name: "id",
    required: false,
    description: "Get posts created after this id",
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: "Return all posts",
    type: [PostPreview],
  })
  async getPostPreviews(@Query("createdAt") createdAt = "", @Query("id") id = ""): Promise<PostPreview[]> {
    return await this.postService.getPreviewPosts(createdAt, id);
  }

  @Get("/previews/:category")
  @ApiOperation({ summary: "Get all posts", operationId: "getPostPreviewsInCategory" })
  @ApiQuery({
    name: "createdAt",
    required: false,
    description: "Get posts created after this date",
    type: String,
  })
  @ApiQuery({
    name: "id",
    required: false,
    description: "Get posts created after this id",
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: "Return all posts",
    type: [PostPreview],
  })
  async getPostPreviewsInCategory(
    @Param("category") categoryId: string,
    @Query("createdAt") createdAt = "",
    @Query("id") id = "",
  ): Promise<PostPreview[]> {
    if (Number.isNaN(Number(categoryId))) {
      throw new NotFoundException("category not found");
    }
    return await this.postService.getPreviewPostsInCategory(Number(categoryId), createdAt, id);
  }

  @Get("/search")
  @ApiOperation({ summary: "Search posts", operationId: "searchPosts" })
  @ApiQuery({
    name: "query",
    required: true,
    description: "Search query",
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: "Return search results",
    type: [PostPreview],
  })
  async searchPosts(@Query("query") query: string): Promise<PostPreview[]> {
    const keywords = query.split(/\s+/).filter((keyword) => keyword.length > 0);
    return await this.postService.searchPosts(keywords);
  }

  @Get("/mypreviews")
  @ApiOperation({ summary: "Get user's posts", operationId: "getMyPostPreviews" })
  @ApiResponse({
    status: 200,
    description: "Return user's posts",
    type: [PostPreview],
  })
  @UseGuards(JwtGuard)
  @ApiBearerAuth("access-token")
  async getMyPosts(@Req() req: any): Promise<PostPreview[]> {
    if (!req.user.user) {
      throw new NotFoundException("user not found");
    }

    return await this.postService.getMyPreviewPosts(req.user.user.id);
  }

  @Get("/details/:id")
  @ApiOperation({ summary: "Get post details", operationId: "getPostDetails" })
  @ApiResponse({
    status: 200,
    description: "Return post details",
    type: PostDetail,
  })
  @UseGuards(OptionalJwtGuard)
  @ApiBearerAuth("access-token")
  async getPostDetails(@Req() req: any, @Param("id") id: string): Promise<PostDetail> {
    const userId = req.user?.user?.id || "";
    const postDetails = await this.postService.getPostDetails(id, userId);
    if (!postDetails) {
      throw new NotFoundException("post not found");
    }
    return postDetails;
  }
}
