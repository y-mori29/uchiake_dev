import { Logger, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

export class OptionalJwtGuard extends AuthGuard("jwt") {
  private logger = new Logger("OptionalJwtGuard");

  constructor() {
    super();
  }

  override handleRequest(...args: Parameters<ReturnType<typeof AuthGuard>["prototype"]["handleRequest"]>) {
    try {
      return super.handleRequest(args[0], args[1], args[2], args[3] as any, args[4]);
    } catch (e) {
      if (e instanceof UnauthorizedException) {
        return null;
      }
      this.logger.error(e);
    }
    return null;
  }
}
