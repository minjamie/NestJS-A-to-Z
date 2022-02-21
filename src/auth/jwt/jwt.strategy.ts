import { Payload } from './jwt.payload';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CatsRepository } from 'src/cats/cats.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // PassportStrategy 인증할 때 사용
  // JwtStrategy - authguard 실행 시 작동
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      // jwt에 대한 설정
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }
  async validate(payload: Payload) {
    const cat = await this.catsRepository.findCatByIdWithOutPsw(payload.sub);
    if (cat) {
      return cat; // request.user에 cat이 들어간다.
    } else {
      throw new UnauthorizedException('접근 오류');
    }
  }
}
