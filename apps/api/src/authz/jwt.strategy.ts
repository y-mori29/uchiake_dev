import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { passportJwtSecret } from "jwks-rsa";
import { UserService } from "src/user/user.service";
import { User } from "@prisma/client";

export type UserInfo = { user: User | null; foreignId: string };

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_ISSUER_BASE_URL}/.well-known/jwks.json`,
        handleSigningKeyError: (err, cb) => {
          console.error("JWKS Error:", err);
          // Force cache refresh on error
          if (cb) {
            return cb(err);
          }
        },
        timeout: 2000,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `${process.env.AUTH0_ISSUER_BASE_URL}/`,
      algorithms: ["RS256"],
    });
  }

  async validate(payload: any): Promise<UserInfo> {
    const user = await this.userService.findUserByForeignId(payload.sub);
    return { user, foreignId: payload.sub };
  }
}
