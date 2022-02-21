import { CatsRepository } from 'src/cats/cats.repository';
import { LoginRequestsDto } from './../dto/login.requset.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly CatsRepository: CatsRepository,
    private readonly jwtService: JwtService,
  ) {}

  async jwtLogin(data: LoginRequestsDto) {
    const { email, password } = data;

    // 해당하는 이메일이 있는지
    const cat = await this.CatsRepository.findCatByEmail(email);
    if (!cat) {
      throw new UnauthorizedException('이메일 확인바람');
    }
    // 패스워드 일치하는지
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      cat.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('비밀번호 확인 바람');
    }

    console.log(cat, isPasswordValidated);
    const payload = { email: email, sub: cat.id };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
