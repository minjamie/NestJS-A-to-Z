import { ObjectID } from 'bson';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  @ApiProperty({
    example: 'minjae@kakao.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'minjae',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '123123',
    description: 'password',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Prop({
    required: true,
  })
  password: string;

  @IsString()
  @Prop({
    default:
      'https://www.google.com/search?q=r%EA%B3%A0%EC%96%91%EC%9D%B4+%EC%82%AC%EC%A7%84&sxsrf=APq-WBv8XNz0DsZE60MzJbc28tiQcroNoQ:1645438052086&tbm=isch&source=iu&ictx=1&vet=1&fir=hVm4ioshrcgaOM%252CAEDHf_eQ8FzB8M%252C_%253BkaRLNYgN2jiJpM%252CFIVAl-Pt0-9lEM%252C_%253BQSPfN1N7EzffWM%252CQq_8FJPKt_ObgM%252C_%253Bjyq601ieXuUygM%252CWFromzcyCsmMOM%252C_%253BxIKKYs_ualnqVM%252CrdtF9DtefKiu2M%252C_%253BrNjI7k3n07H7YM%252CAEDHf_eQ8FzB8M%252C_%253BWmNqb7V-taUx1M%252CbrITTTtr452kCM%252C_%253B_UB7iDEOD-a5IM%252CD2ittRBhhrY1CM%252C_%253BEyLQ7CFFbd6OVM%252CtQx6_7v-1Peh-M%252C_%253BZBgBNGgbUkJedM%252CxqIE-bhDMKlLsM%252C_&usg=AI4_-kTDc_cb4zPJla4fyUloqYXEggcMYw&sa=X&ved=2ahUKEwjm_t-0xpD2AhVBB94KHXYNDykQ9QF6BAgDEAE#imgrc=hVm4ioshrcgaOM',
  })
  imgUrl: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
  };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
  };
});
