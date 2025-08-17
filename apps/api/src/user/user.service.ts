import { Injectable } from "@nestjs/common";
import { convertPostToPostPreview } from "src/post/post.service";
import { PrismaService } from "src/prisma/prisma.service";
import { UserProfile } from "./entities/userProfile.entity";
import { Gender } from "@prisma/client";
import { getAge } from "src/utils/user.helper";

export const getGenderFromString = (gender: string): Gender => {
  switch (gender) {
    case "MALE": {
      return Gender.MALE;
    }
    case "FEMALE": {
      return Gender.FEMALE;
    }
    default: {
      return Gender.UNKNOWN;
    }
  }
};

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async registerUser(foreignId: string, name: string, birthday: Date, gender: Gender) {
    return await this.prisma.user.create({
      data: {
        foreignId,
        name,
        birthday,
        gender,
      },
    });
  }

  async findUserByForeignId(foreignId: string) {
    return await this.prisma.user.findUnique({
      where: {
        foreignId,
      },
    });
  }

  async getProfile(userId: string): Promise<UserProfile | null> {
    const userWithDetails = await this.prisma.user.findUnique({
      select: {
        id: true,
        name: true,
        birthday: true,
        gender: true,
        posts: {
          select: {
            id: true,
            title: true,
            category: true,
            answers: {
              select: {
                content: true,
              },
              take: 1,
              orderBy: {
                questionId: "asc",
              },
            },
            createdAt: true,
          },
          orderBy: [
            {
              createdAt: "desc",
            },
            { id: "desc" },
          ],
        },
        _count: {
          select: {
            posts: true,
            comments: true,
          },
        },
      },
      where: {
        id: userId,
      },
    });

    if (!userWithDetails) {
      return null;
    }

    const refCommentCount = await this.prisma.comment.count({
      where: {
        post: {
          userId: userId,
        },
      },
    });

    const refFeedbackCounts = (
      await this.prisma.feedback.groupBy({
        by: ["kind"],
        _count: true,
        where: {
          post: {
            userId: userId,
          },
        },
      })
    ).map((elem) => {
      return {
        kind: elem.kind,
        count: elem._count,
      };
    });

    return {
      id: userWithDetails.id,
      name: userWithDetails.name,
      age: getAge(userWithDetails),
      gender: userWithDetails.gender,
      posts: userWithDetails.posts.map((post) => convertPostToPostPreview(post, userWithDetails)),
      postCount: userWithDetails._count.posts,
      commentCount: userWithDetails._count.comments,
      refCommentCount,
      refFeedbackCounts,
    };
  }
}
