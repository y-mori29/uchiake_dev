import { Module } from "@nestjs/common";
import { SubPostService } from "./sub-post.service";
import { SubPostController } from "./sub-post.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { PostModule } from "src/post/post.module";

@Module({
  providers: [SubPostService],
  controllers: [SubPostController],
  imports: [PrismaModule, PostModule],
  exports: [SubPostService],
})
export class SubPostModule {}
