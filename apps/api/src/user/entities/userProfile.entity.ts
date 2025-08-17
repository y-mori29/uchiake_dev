import { ApiProperty } from "@nestjs/swagger";
import { PostPreview } from "src/post/post.entity";

export class RefFeedbackCount {
  @ApiProperty({
    example: "GOOD",
    description: "Feedback Kind",
  })
  kind: string;

  @ApiProperty({
    example: 10,
    description: "Feedback Count",
  })
  count: number;

  constructor(kind: string, count: number) {
    this.kind = kind;
    this.count = count;
  }
}

export class UserProfile {
  @ApiProperty({
    example: "123e4567-e89b-12d3-a456-426614174000",
    description: "The ID of the user",
  })
  id: string;

  @ApiProperty({
    example: "山田 花子",
    description: "The name of the user",
  })
  name: string;

  @ApiProperty({
    example: "35",
    description: "The age of the user",
  })
  age: number;

  @ApiProperty({
    example: "Female",
    description: "The gender of the user",
  })
  gender: string;

  @ApiProperty({
    description: "The posts of the user",
    type: [PostPreview],
  })
  posts: PostPreview[];

  @ApiProperty({
    example: 3,
    description: "The number of posts of the user",
  })
  postCount: number;

  @ApiProperty({
    example: 5,
    description: "The number of comments of the user",
  })
  commentCount: number;

  @ApiProperty({
    example: 7,
    description: "The number of comments on the user's posts",
  })
  refCommentCount: number;

  @ApiProperty({
    example: 7,
    description: "The number of comments on the user's posts",
    type: [RefFeedbackCount],
  })
  refFeedbackCounts: RefFeedbackCount[];

  constructor(
    id: string,
    name: string,
    age: number,
    gender: string,
    posts: PostPreview[],
    postCount: number,
    commentCount: number,
    refCommentCount: number,
    refFeedbackCounts: RefFeedbackCount[],
  ) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.posts = posts;
    this.postCount = postCount;
    this.commentCount = commentCount;
    this.refCommentCount = refCommentCount;
    this.refFeedbackCounts = refFeedbackCounts;
  }
}
