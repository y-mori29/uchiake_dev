import { ApiProperty } from "@nestjs/swagger";

class NotificationPostDto {
  @ApiProperty({
    description: "Post ID",
    type: String,
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  id!: string;
}

class NotificationCommentDto {
  @ApiProperty({
    description: "Comment ID",
    type: String,
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  id!: string;

  @ApiProperty({
    description: "Comment content",
    type: String,
    example: "This is a comment",
  })
  content!: string;

  @ApiProperty({
    description: "Associated post",
    type: NotificationPostDto,
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  post!: NotificationPostDto;
}

class NotificationDto {
  @ApiProperty({
    description: "Notification ID",
    type: String,
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  id!: string;

  @ApiProperty({
    description: "Creation timestamp",
    type: Date,
    example: "2023-01-01T00:00:00Z",
  })
  createdAt!: Date;

  @ApiProperty({
    description: "Read status",
    type: Boolean,
    example: false,
  })
  read!: boolean;

  @ApiProperty({
    description: "Associated comment",
    type: NotificationCommentDto,
  })
  comment!: NotificationCommentDto;
}

export class GetNotificationsResponseDto {
  @ApiProperty({
    description: "List of notifications",
    type: [NotificationDto],
  })
  notifications!: NotificationDto[];
}
