import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class HasUnreadNotificationResponseDto {
  @ApiProperty({
    description: "Whether the user has unread notifications",
    required: true,
    type: Boolean,
    example: true,
  })
  @IsNotEmpty()
  hasUnreadNotifications!: boolean;
}
