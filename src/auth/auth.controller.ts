import { AuthService } from './auth.service';
import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthDto } from 'src/dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto)
    }

    @Post('signin')
    signin() {
        return this.authService.signin()
    }
}