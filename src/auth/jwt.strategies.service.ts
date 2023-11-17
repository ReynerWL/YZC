import { User_Yzc } from "#/user_yzc/entities/user_yzc.entity";
import { HttpException, HttpStatus } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtraJwt, Strategy } from "passport-jwt"
import { Repository } from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    @InjectRepository(User_Yzc)
    private useryzcRepository: Repository<User_Yzc>
  ){
    super({
      secretOrKey: 'YzcSecretKey',
      jwtFromRequest: ExtraJwt.fromAuthHeaderAsBearerToken(),
    })
  }

  async validate(payload: any){
    try {
      const useryzcOne = this.useryzcRepository.findOne({
        where: {id: payload.id}
      })
      if (!useryzcOne) {
        throw new HttpException({
            statusCode: HttpStatus.UNAUTHORIZED,
            message: "Token Is Invalid",
        },HttpStatus.UNAUTHORIZED)
      }
      return useryzcOne
    } catch (error) {
        throw error
    }
  }


}