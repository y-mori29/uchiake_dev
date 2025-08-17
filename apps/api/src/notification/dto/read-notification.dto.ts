import { IsISO8601, IsNotEmpty, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ReadNotificationDto {
  @ApiProperty({
    description: "Mark all notifications before this timestamp as read",
    required: true,
    type: String,
    example: "2023-01-01T00:00:00Z",
  })
  @IsNotEmpty()
  @IsISO8601()
  timestamp!: string;

  @ApiProperty({
    description: "Notification ID",
    required: true,
    type: String,
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsNotEmpty()
  @IsUUID()
  notificationId!: string;
}
