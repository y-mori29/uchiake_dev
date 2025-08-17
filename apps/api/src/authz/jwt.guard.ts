import { Logger } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

export class JwtGuard extends AuthGuard("jwt") {
  private logger = new Logger("JwtGuard");

  constructor() {
    super();
  }

  override handleRequest(...args: Parameters<ReturnType<typeof AuthGuard>["prototype"]["handleRequest"]>) {
    if (args[0] || !args[1]) {
      this.logger.error(args[2]);
    }
    return super.handleRequest(args[0], args[1], args[2], args[3] as any, args[4]);
  }
}
