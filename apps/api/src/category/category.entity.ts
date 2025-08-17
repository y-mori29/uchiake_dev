import { ApiProperty } from "@nestjs/swagger";

export class Category {
  @ApiProperty({
    example: 1,
    description: "The unique identifier of the category",
  })
  id: number;

  @ApiProperty({ example: "Category name", description: "The name of the category" })
  name: string;

  @ApiProperty({
    example: 1,
    description: "The order of the category",
  })
  order: number;

  @ApiProperty({
    example: "/path/to/image",
    description: "The image of the category",
  })
  image: string;

  constructor(id: number, name: string, order: number, image: string) {
    this.id = id;
    this.name = name;
    this.order = order;
    this.image = image;
  }
}

export class SimpleCategory {
  @ApiProperty({
    example: "Category name",
    description: "The name of the category",
  })
  name!: string;

  @ApiProperty({
    example: "/path/to/image",
    description: "The image path of the category",
  })
  image!: string;
}
