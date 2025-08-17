import {
  Controller,
  Get,
  UseGuards,
  Request,
  NotFoundException,
  Post,
  Body,
  BadRequestException,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { getGenderFromString, UserService } from "./user.service";
import { UserCreate } from "./entities/userCreate.entity";
import { UserProfile } from "./entities/userProfile.entity";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { SimpleUser } from "./entities/simpleUser.entity";
import { JwtGuard } from "src/authz/jwt.guard";

@Controller("user")
@ApiTags("default")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: "Get user", operationId: "getUser" })
  @ApiResponse({
    status: 201,
    description: "Get user",
    type: SimpleUser,
  })
  @UseGuards(JwtGuard)
  @ApiBearerAuth("access-token")
  async get(@Request() req: any): Promise<SimpleUser> {
    if (!req.user.foreignId) {
      throw new BadRequestException("Missing foreignId");
    }

    if (req.user.foreignId.length === 0) {
      throw new BadRequestException("Invalid foreignId");
    }

    if (!req.user.user) {
      throw new NotFoundException("User not found");
    }

    return {
      name: req.user.user.name,
    };
  }

  @Post()
  @ApiOperation({ summary: "Create user", operationId: "createUser" })
  @ApiResponse({
    status: 201,
    description: "Create user",
    type: String,
  })
  @UseGuards(JwtGuard)
  @ApiBearerAuth("access-token")
  async create(@Request() req: any, @Body() userInfo: UserCreate): Promise<string> {
    if (!req.user.foreignId) {
      throw new BadRequestException("Missing foreignId");
    }

    if (req.user.foreignId.length === 0) {
      throw new BadRequestException("Invalid foreignId");
    }

    if (req.user.user) {
      throw new BadRequestException("User already exists");
    }

    if (!userInfo.name) {
      throw new BadRequestException("Missing name");
    }

    if (userInfo.name.length < 3 || userInfo.name.length > 20) {
      throw new BadRequestException("Invalid name");
    }

    if (!userInfo.birthday) {
      throw new BadRequestException("Missing birthday");
    }

    const birthdayInDate = new Date(userInfo.birthday);
    if (isNaN(birthdayInDate.getTime())) {
      throw new BadRequestException("Invalid birthday");
    }

    try {
      await this.userService.registerUser(
        req.user.foreignId,
        userInfo.name,
        birthdayInDate,
        getGenderFromString(userInfo.gender),
      );
    } catch (e: unknown) {
      if (e instanceof PrismaClientKnownRequestError && e.code === "P2002") {
        throw new BadRequestException("User already exists");
      }
      console.log(e);
      throw new BadRequestException("Failed to create user");
    }

    return "ok";
  }

  @Get("/profile")
  @ApiOperation({ summary: "Get user profile", operationId: "getProfile" })
  @ApiResponse({
    status: 200,
    description: "User profile",
    type: UserProfile,
  })
  @UseGuards(JwtGuard)
  @ApiBearerAuth("access-token")
  async profile(@Request() req: any): Promise<UserProfile> {
    const user = req.user.user;
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const result = await this.userService.getProfile(user.id);
    if (!result) {
      throw new NotFoundException("User not found");
    }

    return result;
  }
}
