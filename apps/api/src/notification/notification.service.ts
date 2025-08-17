import { Injectable, Logger } from "@nestjs/common";
import { GetNotificationsDto } from "./dto/get-notifications.dto";
import { ReadNotificationDto } from "./dto/read-notification.dto";
import { GetNotificationsResponseDto } from "./dto/get-notifications-response.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(private prisma: PrismaService) {}

  async getNotifications(userId: string, dto: GetNotificationsDto): Promise<GetNotificationsResponseDto> {
    const where: Prisma.NotificationWhereInput = {
      userId,
    };

    const PAGE_SIZE = 20;
    const isFollowingRequest = !!dto.notificationId && !!dto.timestamp;

    const notifications = await this.prisma.notification.findMany({
      where,
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      take: PAGE_SIZE,
      select: {
        id: true,
        createdAt: true,
        read: true,
        comment: {
          select: {
            id: true,
            content: true,
            post: {
              select: {
                id: true,
              },
            },
          },
        },
      },
      cursor: isFollowingRequest ? { createdAt: new Date(dto.timestamp!), id: dto.notificationId } : undefined,
      skip: isFollowingRequest ? 1 : 0,
    });

    return {
      notifications,
    };
  }

  async markAsRead(userId: string, dto: ReadNotificationDto) {
    const result = await this.prisma.notification.updateMany({
      where: {
        userId,
        read: false,
        OR: [
          {
            createdAt: {
              lte: new Date(dto.timestamp),
            },
          },
          {
            AND: [
              {
                createdAt: new Date(dto.timestamp),
              },
              {
                id: {
                  lte: dto.notificationId,
                },
              },
            ],
          },
        ],
      },
      data: {
        read: true,
        updatedAt: new Date(),
      },
    });

    return {
      count: result.count,
    };
  }

  async createNotification(userId: string, commentId: string) {
    await this.prisma.notification.create({
      data: {
        userId,
        commentId,
      },
    });
  }

  async hasUnreadNotifications(userId: string): Promise<boolean> {
    const result = await this.prisma.notification.count({
      where: {
        userId,
        read: false,
      },
    });

    return result > 0;
  }
}
