import { ApiProperty } from "@nestjs/swagger";

export class SubQuestion {
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

export class SubAnswer {
  @ApiProperty({
    type: SubQuestion,
    description: "The question related to this answer",
  })
  subQuestion!: SubQuestion;

  @ApiProperty({
    example: "Answer content",
    description: "The content of the answer",
  })
  content!: string;
}

export class SubPost {
  @ApiProperty({
    example: "a8b4b3b4-4b3b-4b3b-4b3b-4b3b4b3b4b3b",
    description: "The unique identifier of the sub-post",
  })
  id!: string;

  @ApiProperty({
    example: "Sub-post title",
    description: "The title of the sub-post",
  })
  title!: string;

  @ApiProperty({
    type: [SubAnswer],
    description: "The sub-answers of the sub-post",
  })
  subAnswers!: SubAnswer[];
}
