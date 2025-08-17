import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Request,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { NotificationService } from "./notification.service";
import { GetNotificationsDto } from "./dto/get-notifications.dto";
import { ReadNotificationDto } from "./dto/read-notification.dto";
import { GetNotificationsResponseDto } from "./dto/get-notifications-response.dto";
import { JwtGuard } from "src/authz/jwt.guard";
import { Prisma } from "@prisma/client";
import { HasUnreadNotificationResponseDto } from "./dto/has-unread-notification-response.dto";

@Controller("notifications")
@ApiTags("default")
export class NotificationController {
  private readonly logger = new Logger(NotificationController.name);

  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @ApiOperation({
    summary: "Get notifications with optional paging",
    operationId: "getNotifications",
  })
  @ApiResponse({
    status: 200,
    description: "Returns notifications with pagination info",
    type: GetNotificationsResponseDto,
  })
  @UseGuards(JwtGuard)
  @ApiBearerAuth("access-token")
  async getNotifications(@Request() req: any, @Query() queryParams: GetNotificationsDto) {
    if (!req.user.user) {
      throw new NotFoundException("User not found");
    }

    if (
      (queryParams.timestamp && !queryParams.notificationId) ||
      (!queryParams.timestamp && queryParams.notificationId)
    ) {
      throw new BadRequestException("Both timestamp and notificationId must be provided together for pagination");
    }

    this.logger.log(queryParams);
    this.logger.log(req.user.user);

    try {
      const userId = req.user.user.id;
      return this.notificationService.getNotifications(userId, queryParams);
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException("Unable to fetch notifications");
      }
      this.logger.error("Error fetching notifications", error);
      throw new InternalServerErrorException("An unexpected error occurred");
    }
  }

  @Post("read")
  @ApiOperation({ summary: "Mark notifications as read", operationId: "markNotificationsAsRead" })
  @UseGuards(JwtGuard)
  @ApiBearerAuth("access-token")
  async markAsRead(@Request() req: any, @Body() readDto: ReadNotificationDto) {
    if (!req.user.user) {
      throw new NotFoundException("User not found");
    }

    try {
      const userId = req.user.user.id;
      await this.notificationService.markAsRead(userId, readDto);
      return "ok";
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException("Invalid notification data provided");
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException("Unable to update notifications");
      }
      this.logger.error("Error marking notifications as read", error);
      throw new InternalServerErrorException("An unexpected error occurred");
    }
  }

  @Get("has-unread")
  @ApiOperation({ summary: "Check if user has unread notifications", operationId: "hasUnreadNotifications" })
  @ApiResponse({
    status: 200,
    description: "Returns true if user has unread notifications, false otherwise",
    type: HasUnreadNotificationResponseDto,
  })
  @UseGuards(JwtGuard)
  @ApiBearerAuth("access-token")
  async hasUnreadNotifications(@Request() req: any): Promise<HasUnreadNotificationResponseDto> {
    if (!req.user.user) {
      throw new NotFoundException("User not found");
    }

    const userId = req.user.user.id;
    return { hasUnreadNotifications: await this.notificationService.hasUnreadNotifications(userId) };
  }
}
