import { ExtractJwt, Strategy, JwtPayload } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ConfigService } from '../config/config.service';
import { ProfileService } from '../profile/profile.service';

/**
 * Jwt Strategy Class
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * Constructor
   * @param {ConfigService} configService
   * @param {ProfileService} profileService
   */
  constructor(
    readonly configService: ConfigService,
    private readonly profileService: ProfileService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('WEBTOKEN_SECRET_KEY'),
    });
  }

  /**
   * Checks if the bearer token is a valid token
   * @param {JwtPayload} jwtPayload validation method for jwt token
   * @param {any} done callback to resolve the request user with
   * @returns {Promise<boolean>} whether or not to validate the jwt token
   */
  async validate({ iat, exp, id }: JwtPayload, done): Promise<boolean> {
    const timeDiff = exp - iat;
    if (timeDiff <= 0) {
      throw new UnauthorizedException();
    }

    const profile = await this.profileService.get(id);
    if (!profile) {
      throw new UnauthorizedException();
    }

    delete profile.password;
    done(null, { ...profile, roles: profile.roles.map(role => role.role) });
    return true;
  }
}
