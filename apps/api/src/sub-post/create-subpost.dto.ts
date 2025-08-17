import { ApiProperty } from "@nestjs/swagger";

export class SubAnswerCreateDto {
  @ApiProperty({
    example: 1,
    description: "The id of the sub-question",
  })
  subQuestionId!: number;

  @ApiProperty({
    example: "Answer content",
    description: "The content of the sub-answer",
  })
  content!: string;
}

export class CreateSubPostDto {
  @ApiProperty({
    example: "Post title",
    description: "The title of the post",
  })
  title!: string;

  @ApiProperty({
    example: "8d8b3b1e-4b7b-4b7b-8b7b-8b7b4b7b8b7b",
    description: "The id of parent post",
  })
  postId!: string;

  @ApiProperty({
    type: [SubAnswerCreateDto],
    example: [
      {
        questionId: 1,
        content: "Answer content",
      },
    ],
    description: "The sub answers of the sub post",
  })
  subAnswers!: SubAnswerCreateDto[];
}
