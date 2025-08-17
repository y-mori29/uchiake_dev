import { ApiProperty } from "@nestjs/swagger";
import { SimpleCategory } from "src/category/category.entity";
import { SubPost } from "src/sub-post/sub-post.entity";
import { SimpleUser } from "src/user/entities/simpleUser.entity";
import { Comment } from "src/comment/comment.entity";
import { Feedback } from "src/feedback/feedback.entity";
import { FeedbackKind } from "@prisma/client";

export class SimpleQuestion {
  @ApiProperty({
    example: 1,
    description: "The order of the question",
  })
  order!: number;

  @ApiProperty({
    example: "Question title",
    description: "The title of the question",
  })
  viewContent!: string;
}

export class AnswerWithQuestion {
  @ApiProperty({
    type: SimpleQuestion,
    description: "The question related to this answer",
  })
  question!: SimpleQuestion;

  @ApiProperty({
    example: "Answer content",
    description: "The content of the answer",
  })
  content!: string;
}

export class PostPreview {
  @ApiProperty({
    example: "uuid",
    description: "The unique identifier of the post",
    type: String,
  })
  id!: string;

  @ApiProperty({ example: "Post title", description: "The title of the post" })
  title!: string;

  @ApiProperty({
    example: "Post description",
    description: "The description of the post",
    type: String,
  })
  description!: string;

  @ApiProperty({
    example: '["tag1", "tag2"]',
    description: "The tags of the post",
    type: [String],
  })
  tags!: string[];

  @ApiProperty({
    example: "2021-10-10T00:00:00Z",
    description: "The date the post was created",
    type: String,
  })
  createdAt!: string;

  constructor(id: string, title: string, description: string, tags: string[], createdAt: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.tags = tags;
    this.createdAt = createdAt;
  }
}

export class PostFeedback {
  @ApiProperty({
    example: "GOOD",
    description: "The feedback type",
  })
  kind: FeedbackKind;

  @ApiProperty({
    example: "Feedback content",
    description: "The content of the feedback",
  })
  count: number;

  @ApiProperty({
    example: true,
    description: "The uset has pushed the feedback",
  })
  pushed: boolean;

  constructor(kind: FeedbackKind, count: number, pushed: boolean) {
    this.kind = kind;
    this.count = count;
    this.pushed = pushed;
  }
}

export class PostDetail {
  @ApiProperty({
    example: "uuid",
    description: "The unique identifier of the post",
  })
  id: string;

  @ApiProperty({
    type: SimpleUser,
    example: {
      name: "User information",
    },
    description: "The user who posted the post",
  })
  user: SimpleUser;

  @ApiProperty({ example: "Post title", description: "The title of the post" })
  title: string;

  @ApiProperty({
    example: '["tag1", "tag2"]',
    description: "The tags of the post",
    type: [String],
  })
  tags!: string[];


  @ApiProperty({
    type: SimpleCategory,
    example: {
      name: "Category name",
      image: "/path/to/image",
    },
    description: "The category of the post",
  })
  category: SimpleCategory;

  @ApiProperty({
    type: [AnswerWithQuestion],
    example: [
      {
        question: {
          order: 1,
          title: "Question title",
        },
        content: "Answer content",
      },
    ],
    description: "The answers of the post",
  })
  answers: AnswerWithQuestion[];

  @ApiProperty({
    type: [SubPost],
    description: "The content of the post",
  })
  subPosts: SubPost[];

  @ApiProperty({
    type: [Comment],
    description: "The comments of the post",
  })
  comments: Comment[];

  @ApiProperty({
    type: [PostFeedback],
    description: "The feedback of the post",
  })
  feedback: PostFeedback[];

  constructor(
    id: string,
    user: SimpleUser,
    title: string,
    tags: string[],
    category: SimpleCategory,
    answers: AnswerWithQuestion[],
    subPosts: SubPost[],
    comments: Comment[],
    feedback: PostFeedback[],
  ) {
    this.id = id;
    this.user = user;
    this.title = title;
    this.tags = tags;
    this.category = category;
    this.answers = answers;
    this.subPosts = subPosts;
    this.comments = comments;
    this.feedback = feedback;
  }
}

export class Answer {
  @ApiProperty({
    example: 1,
    description: "The id of the question",
  })
  questionId!: number;

  @ApiProperty({
    example: "Answer content",
    description: "The content of the answer",
  })
  content!: string;
}

export class CreatePostDto {
  @ApiProperty({
    example: "Post title",
    description: "The title of the post",
  })
  title!: string;

  @ApiProperty({
    example: 1,
    description: "The category of the post",
  })
  categoryId!: number;

  @ApiProperty({
    type: [Answer],
    example: [
      {
        questionId: 1,
        content: "Answer content",
      },
    ],
    description: "The answers of the post",
  })
  answers!: Answer[];
}
