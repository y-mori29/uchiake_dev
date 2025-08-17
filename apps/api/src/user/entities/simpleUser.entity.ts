import { ApiProperty } from "@nestjs/swagger";

export class SimpleUser {
  @ApiProperty({
    example: "山田 花子",
    description: "The name of the user",
  })
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export class UserWithRole {
  @ApiProperty({
    example: "山田 花子",
    description: "The name of the user",
  })
  name: string;

  @ApiProperty({
    example: "MEMBER",
    description: "The role of the user",
  })
  role: string;

  constructor(name: string, role: string) {
    this.name = name;
    this.role = role;
  }
}
