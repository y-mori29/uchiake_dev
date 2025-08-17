import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { Category } from "./category.entity";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("categories")
@ApiTags("default")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: "Get all categories", operationId: "getCategories" })
  @ApiResponse({
    status: 200,
    description: "Return all categories",
    type: [Category],
  })
  async getCategories(): Promise<Category[]> {
    return await this.categoryService.list();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get category by id", operationId: "getCategory" })
  @ApiResponse({
    status: 200,
    description: "Return category by id",
    type: Category,
  })
  async getCategory(@Param("id") id: string): Promise<Category> {
    if (Number.isNaN(Number(id))) {
      throw new NotFoundException("category not found");
    }
    const category = await this.categoryService.findById(Number(id));
    if (!category) {
      throw new NotFoundException("Category not found");
    }
    return category;
  }
}
