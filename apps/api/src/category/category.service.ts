import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Category } from "./category.entity";

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async list(): Promise<Category[]> {
    return await this.prisma.category.findMany({
      select: {
        id: true,
        name: true,
        order: true,
        image: true,
      },
      orderBy: {
        order: "asc",
      },
    });
  }

  async findById(id: number): Promise<Category | null> {
    return await this.prisma.category.findUnique({
      select: {
        id: true,
        name: true,
        order: true,
        image: true,
      },
      where: { id },
    });
  }
}
