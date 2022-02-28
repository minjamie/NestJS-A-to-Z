import { CatsService } from './../services/cats.service';
import { AuthService } from '../../auth/services/auth.service';
import { Cat } from '../cats.schema';
import { multerOptions } from '../../common/utils/multer.options';
import { CurrentUser } from '../../common/decorators/user.decorators';
import { JwtAuthGuard } from '../../auth/jwt/jwt.guard';
import { LoginRequestsDto } from '../../auth/dto/login.requset.dto';
import { ReadOnlyCatDto } from '../dto/cat.dto';
import { CatRequestDto } from '../dto/cat.request.dto';
import { SuccessInterceptor } from '../../common/interceptor/sucess.interceptor';
import { HttpExceptionFilter } from '../../common/exceptions/http-exception.filter';
import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBasicAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
// 클래스에 적으면 전체 적용
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  //UseFilters 각각의 컨트롤러에 적용
  // @UseFilters(HttpExceptionFilter)
  // 파이프는 클라이언트 요청에 들어오 는 데이터 1> 유효성 검사 및 2> 변환을 수행하여 서버가 원하는 데이터를 얻도록 도와주는 클래스
  // (@Param('id', ParseIntPipe, PositiveIntPipe) param: number)

  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @ApiBasicAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat) {
    console.log(cat);
    return cat;
  }

  @ApiOperation({ summary: '모든 고양이 가져오기' })
  // @ApiBasicAuth()
  // @UseGuards(JwtAuthGuard)
  @Get('all')
  getAllCat() {
    return this.catsService.getAllCat();
  }

  @ApiResponse({
    status: 500,
    description: 'server error..',
  })
  @ApiResponse({
    status: 200,
    description: 'success..!',
    type: ReadOnlyCatDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return this.catsService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  login(@Body() data: LoginRequestsDto) {
    return this.authService.jwtLogin(data);
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut() {
    return 'logout';
  }

  @ApiOperation({ summary: '이미지 업로드' })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cats')))
  @Post('upload')
  uploadCatImg(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @CurrentUser() cat: Cat,
  ) {
    return this.catsService.uploads(cat, files);
  }
}
