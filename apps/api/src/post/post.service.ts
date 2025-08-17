import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { CreatePostDto, PostDetail, PostFeedback, PostPreview } from "./post.entity";
import { PrismaService } from "src/prisma/prisma.service";
import { Gender, User } from "@prisma/client";
import { getAgeDecade } from "src/utils/user.helper";

interface UserForPreview {
  birthday: Date;
  gender: Gender;
}

export const getTags = (categoryName: string, user: UserForPreview): string[] => {
  const tags: string[] = [];
  tags.push(categoryName);

  const roughAge = getAgeDecade(user);
  tags.push(`${roughAge}代`);

  if (user.gender === Gender.MALE) {
    tags.push("男");
  } else if (user.gender === Gender.FEMALE) {
    tags.push("女");
  }

  return tags;
};

interface PostForPreview {
  id: string;
  category: {
    name: string;
  };
  title: string;
  answers: {
    content: string;
  }[];
  createdAt: Date;
}

export const convertPostToPostPreview = (post: PostForPreview, user: UserForPreview): PostPreview => {
  const tags = getTags(post.category.name, user);
  return {
    id: post.id,
    title: post.title,
    tags,
    description: post.answers[0]?.content || "",
    createdAt: post.createdAt.toISOString(),
  };
};

export type PostWithUserId = {
  id: string;
  user: {
    id: string;
  };
};

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);

  constructor(private readonly prisma: PrismaService) {}

  async createPost(createPostDto: CreatePostDto, user: User) {
    await this.prisma.post.create({
      data: {
        title: createPostDto.title,
        answers: {
          create: createPostDto.answers.map((answer) => {
            return {
              question: {
                connect: {
                  id: answer.questionId,
                },
              },
              content: answer.content,
            };
          }),
        },
        category: {
          connect: {
            id: createPostDto.categoryId,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  async getPostByIdAndUserId(
    id: string,
    userId: string,
  ): Promise<{
    id: string;
    user: {
      id: string;
    };
  } | null> {
    return await this.prisma.post.findUnique({
      select: {
        id: true,
        user: {
          select: {
            id: true,
          },
        },
      },
      where: {
        id,
        userId,
      },
    });
  }

  async getPreviewPosts(createdAt: string, id: string): Promise<PostPreview[]> {
    if (!createdAt || !id) {
      return (
        await this.prisma.post.findMany({
          select: {
            id: true,
            title: true,
            category: {
              select: {
                name: true,
              },
            },
            user: {
              select: {
                birthday: true,
                gender: true,
              },
            },
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
          take: 10,
        })
      ).map((post) => {
        return convertPostToPostPreview(post, post.user);
      });
    }

    const createdAtDateTime = new Date(createdAt);
    if (isNaN(createdAtDateTime.getTime())) {
      throw new BadRequestException("Invalid createdAt");
    }

    return (
      await this.prisma.post.findMany({
        select: {
          id: true,
          title: true,
          category: {
            select: {
              name: true,
            },
          },
          user: {
            select: {
              birthday: true,
              gender: true,
            },
          },
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
        take: 10,
        skip: 1,
        cursor: {
          createdAt: createdAtDateTime,
          id,
        },
      })
    ).map((post) => {
      return convertPostToPostPreview(post, post.user);
    });
  }

  async getPreviewPostsInCategory(category: number, createdAt: string, id: string): Promise<PostPreview[]> {
    if (!createdAt || !id) {
      return (
        await this.prisma.post.findMany({
          select: {
            id: true,
            title: true,
            category: {
              select: {
                name: true,
              },
            },
            user: {
              select: {
                birthday: true,
                gender: true,
              },
            },
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
          where: {
            categoryId: category,
          },
          orderBy: [
            {
              createdAt: "desc",
            },
            { id: "desc" },
          ],
          take: 10,
        })
      ).map((post) => {
        return convertPostToPostPreview(post, post.user);
      });
    }

    const createdAtDateTime = new Date(createdAt);
    if (isNaN(createdAtDateTime.getTime())) {
      throw new BadRequestException("Invalid createdAt");
    }

    return (
      await this.prisma.post.findMany({
        select: {
          id: true,
          title: true,
          category: {
            select: {
              name: true,
            },
          },
          user: {
            select: {
              birthday: true,
              gender: true,
            },
          },
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
        where: {
          categoryId: category,
        },
        orderBy: [
          {
            createdAt: "desc",
          },
          { id: "desc" },
        ],
        take: 10,
        skip: 1,
        cursor: {
          createdAt: createdAtDateTime,
          id,
        },
      })
    ).map((post) => {
      return convertPostToPostPreview(post, post.user);
    });
  }

  async searchPosts(keywords: string[]): Promise<PostPreview[]> {
    const posts = await this.prisma.post.findMany({
      select: {
        id: true,
        title: true,
        category: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            birthday: true,
            gender: true,
          },
        },
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
      where: {
        AND: keywords.map((keyword) => ({
          OR: [
            { title: { contains: keyword, mode: "insensitive" } },
            { answers: { some: { content: { contains: keyword, mode: "insensitive" } } } },
          ],
        })),
      },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      take: 50,
    });

    return posts.map((post) => {
      return convertPostToPostPreview(post, post.user);
    });
  }

  async getMyPreviewPosts(userId: string): Promise<PostPreview[]> {
    return (
      await this.prisma.post.findMany({
        select: {
          id: true,
          title: true,
          category: {
            select: {
              name: true,
            },
          },
          user: {
            select: {
              birthday: true,
              gender: true,
            },
          },
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
        where: {
          userId,
        },
        orderBy: [
          {
            createdAt: "desc",
          },
          { id: "desc" },
        ],
      })
    ).map((post) => {
      return convertPostToPostPreview(post, post.user);
    });
  }

  async getPostDetails(id: string, userId = ""): Promise<PostDetail | null> {
    const post = await this.prisma.post.findUnique({
      where: { id },
      select: {
        id: true,
        user: {
          select: {
            name: true,
            birthday: true,
            gender: true,
          },
        },
        title: true,
        category: {
          select: {
            name: true,
            image: true,
          },
        },
        answers: {
          select: {
            question: {
              select: {
                order: true,
                viewContent: true,
              },
            },
            content: true,
          },
          orderBy: {
            question: {
              order: "asc",
            },
          },
        },
        subPosts: {
          select: {
            id: true,
            title: true,
            subAnswers: {
              select: {
                subQuestion: {
                  select: {
                    order: true,
                    viewContent: true,
                  },
                },
                content: true,
              },
              orderBy: {
                subQuestion: {
                  order: "asc",
                },
              },
            },
          },
        },
        comments: {
          select: {
            id: true,
            user: {
              select: {
                name: true,
                role: true,
              },
            },
            content: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 20,
        },
      },
    });

    if (!post) return null;

    const tags = getTags(post.category.name, post.user);

    const feedbackAggregates = await this.prisma.feedback.groupBy({
      by: ["kind"],
      _count: { _all: true },
      where: { postId: id },
    });

    const userFeedbacks = await this.prisma.feedback.findMany({
      select: { kind: true },
      where: { postId: id, userId },
    });

    const feedback = feedbackAggregates.map((agg) => {
      const pushed = userFeedbacks.some((uf) => uf.kind === agg.kind);
      return new PostFeedback(agg.kind, agg._count._all, pushed);
    });

    return new PostDetail(
      post.id,
      post.user,
      post.title,
      tags,
      post.category,
      post.answers,
      post.subPosts,
      post.comments,
      feedback,
    );
  }

  async getPostWithUserId(postId: string): Promise<PostWithUserId | null> {
    return await this.prisma.post.findUnique({
      where: { id: postId },
      select: {
        id: true,
        user: {
          select: {
            id: true,
          },
        },
      },
    });
  }
}
