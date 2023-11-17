import { Body, Controller , HttpStatus, Post, Get, Req, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport/dist';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post('/register')
    async register(@Body() registerDto: RegisterDto){
     const data = await this.authService.register(registerDto)
     return {data,statusCode: HttpStatus.CREATED,message: "Success"}
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto){
        const data = await this.authService.login(loginDto)
        return {data,statusCode: HttpStatus.OK,message: "Success"}
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/profile')
    profile(@Req() req){
        return req.user_yzc
    }
}
