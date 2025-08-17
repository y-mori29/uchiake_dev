import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { configDotenv } from "dotenv";
import * as passport from "passport";
import { RequestMethod } from "@nestjs/common";

async function bootstrap() {
  process.env.DEBUG = "passport:*";
  const app = await NestFactory.create(AppModule, {
    logger: ["log", "error", "warn", "debug", "verbose"],
  });
  app.enableCors();
  configDotenv();

  passport.debug = true;

  const config = new DocumentBuilder()
    .setTitle("Patient Voice API")
    .setDescription("Patient Voice service API description")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
      "access-token",
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("document", app, documentFactory);

  app.setGlobalPrefix("iapi/v1", {
    exclude: [{ path: "health", method: RequestMethod.GET }],
  });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
