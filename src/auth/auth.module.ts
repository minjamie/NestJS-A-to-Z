import { AuthService } from './services/auth.service';
import { ConfigModule } from '@nestjs/config';
import { CatsModule } from './../cats/cats.module';
import { JwtStrategy } from './jwt/jwt.strategy';
import { CatsRepository } from './../cats/cats.repository';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    // JwtModule은 JWT를 만들어줄 때 사용
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1y' },
    }),
    forwardRef(() => CatsModule),
  ],

  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
