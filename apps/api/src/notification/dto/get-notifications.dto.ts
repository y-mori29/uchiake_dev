import { IsOptional, IsUUID, IsISO8601 } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class GetNotificationsDto {
  @ApiProperty({
    description: "Timestamp to get notifications before this time (for pagination)",
    required: false,
    type: String,
    example: "2023-01-01T00:00:00Z",
  })
  @IsOptional()
  @IsISO8601()
  timestamp?: string;

  @ApiProperty({
    description: "Notification ID to prevent duplicates (for pagination)",
    required: false,
    type: String,
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsOptional()
  @IsUUID()
  notificationId?: string;

  validate() {
    if ((this.timestamp && !this.notificationId) || (!this.timestamp && this.notificationId)) {
      throw new Error("Both timestamp and notificationId must be provided together for pagination");
    }
    return true;
  }
}
