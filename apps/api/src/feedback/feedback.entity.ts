import { ApiProperty } from "@nestjs/swagger";

export class Feedback {
  @ApiProperty({
    type: String,
    description: "kind name of feedback",
  })
  kind!: string;
}

export class UpdateFeedbackDto {
  @ApiProperty({
    description: "turn on feedback or not",
  })
  flag!: boolean;
}
