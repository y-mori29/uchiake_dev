import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller("health")
@ApiTags("default")
export class HealthController {
  @Get()
  healthCheck() {
    return { status: "ok" };
  }
}
