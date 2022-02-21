import { CatRequestDto } from './../dto/cat.request.dto';
import { Cat } from './../cats.schema';
import { CatsRepository } from './../cats.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
/* 인터셉터
@Injectable() 데코레이터로 주석이 달린 클래스, DI이 가능함
AOP(관점지향 프로그래밍-모듈성 증가) 기술에서 영감``을 받은 유용한 기능 셋 존재 
*/
@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async uploads(cat: Cat, files: Express.Multer.File[]) {
    const fileName = `cats/${files[0].filename}`;
    console.log(fileName);
    const newCat = await this.catsRepository.findByIdAndUpdateImg(
      cat.id,
      fileName,
    );
    console.log(newCat);
    return newCat;
  }
  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catsRepository.existByEmail(email);

    if (isCatExist) {
      throw new UnauthorizedException('해당하는 고양이는 이미 존재');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }
}
