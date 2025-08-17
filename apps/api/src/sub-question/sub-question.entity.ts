import { ApiProperty } from "@nestjs/swagger";

export class SubQuestionDto {
  @ApiProperty({ example: 1, description: "The unique identifier of the question" })
  id: number;

  @ApiProperty({
    example: 1,
    description: "The order of the question",
  })
  order: number;

  @ApiProperty({
    example: "あなたが抱えている疾患について教えてください",
    description: "The question",
  })
  content: string;

  @ApiProperty({
    example: "あなたの疾患について（（30文字以上））※詳しく書きたくない部分はぼかして書いていただいて大丈夫です。",
    description: "The description of the question",
  })
  description: string;

  @ApiProperty({
    example: 30,
    description: "The minimum number of characters of the question",
  })
  minimum: number;

  constructor(id: number, order: number, content: string, description: string, minimum: number) {
    this.id = id;
    this.order = order;
    this.content = content;
    this.description = description;
    this.minimum = minimum;
  }
}
