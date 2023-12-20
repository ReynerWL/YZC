import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Query,
    Param,
    Delete,
    ParseUUIDPipe,
    HttpStatus,
    UseGuards,
    Req
  } from '@nestjs/common';import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport/dist';
import { RegisterDto, RegisterPsikologDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserYzcDto } from '#/user_yzc/dto/update-user_yzc.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post('/register')
    async register(@Query('role') level_user: string, @Body() registerDto: RegisterDto){
     const data = await this.authService.register({...registerDto, level_user})
     return {data,statusCode: HttpStatus.CREATED,message: "Success"}
    }
    @Post('/register/psikolog')
    async registerPsikolog(@Query('role') level_user: string, @Body() registerPsikologDto: RegisterPsikologDto){
     const data = await this.authService.registerPsikolog({...registerPsikologDto, level_user})
     return {data,statusCode: HttpStatus.CREATED,message: "Success"}
    }

    @Post('/login')
    async login(@Body() loginDto: LoginDto){
        const data = await this.authService.login(loginDto)
        return {data,statusCode: HttpStatus.OK,message: "Success"}
    }

    @Put('/change-password/:id')
    async changePassword(@Body() changePasswordDto: ChangePasswordDto,updateUserYzcDto: UpdateUserYzcDto, @Param('id', ParseUUIDPipe) id: string){
      const data = await this.authService.changePassword(id,changePasswordDto,updateUserYzcDto)
      return {data, statusCode: HttpStatus.OK,message: "Success"}
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/profile')
    profile(@Req() req){
        return req.user_yzc
    }
}