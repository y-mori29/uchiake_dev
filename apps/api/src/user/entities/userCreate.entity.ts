import { ApiProperty } from "@nestjs/swagger";

export class UserCreate {
  @ApiProperty({
    example: "山田 花子",
    description: "The name of the user",
  })
  name: string;

  @ApiProperty({
    example: "1990-01-01",
    description: "The birthday of the user",
  })
  birthday: string;

  @ApiProperty({
    example: "Female",
    description: 'The gender of the user. Need to be one of ["Male", "Female", "Unknown"]',
  })
  gender: string;

  constructor(name: string, birthday: string, gender: string) {
    this.name = name;
    this.birthday = birthday;
    this.gender = gender;
  }
}
