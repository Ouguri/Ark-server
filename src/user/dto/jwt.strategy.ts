import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { JwtPayload } from './jwt-payload.interface';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { REJISTEROPTION } from '../../.config/secret.config';

// jwt 策略，可注入
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private user: Repository<User>, // 我们需要从数据库获取对象
  ) {
    // 需要提供 secret
    super({
      secretOrKey: REJISTEROPTION.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 把 token 放进头，作为不记名的令牌 bearer
    });
  }

  // 令牌有用/通过后，返回 user 信息
  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user: User = await this.user.findOneBy({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
