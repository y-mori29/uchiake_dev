import { Module } from "@nestjs/common";
import { SubQuestionService } from "./sub-question.service";
import { SubQuestionController } from "./sub-question.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  providers: [SubQuestionService],
  controllers: [SubQuestionController],
  imports: [PrismaModule],
  exports: [SubQuestionService],
})
export class SubQuestionModule {}
