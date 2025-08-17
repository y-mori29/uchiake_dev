import { ApiProperty } from "@nestjs/swagger";
import { UserWithRole } from "src/user/entities/simpleUser.entity";

export class Comment {
  @ApiProperty({
    example: "3808b8a0-4c3e-4f1b-8d2f-5c6e7f8a9d1e",
    description: "The unique identifier of the comment",
    type: String,
  })
  id!: string;

  @ApiProperty({
    type: UserWithRole,
    description: "The user who posted the comment",
  })
  user!: UserWithRole;

  @ApiProperty({
    example: "Comment content",
    description: "The content of the comment",
  })
  content!: string;
}

export class CreateCommentDto {
  @ApiProperty({
    example: "Comment content",
    description: "The content of the comment",
  })
  content!: string;

  @ApiProperty({
    example: "Post ID",
    description: "The ID of the post",
  })
  postId!: string;

  constructor(content: string, postId: string) {
    this.content = content;
    this.postId = postId;
  }
}
