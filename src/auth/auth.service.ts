import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "src/dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as argo from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}
    async signup(dto: AuthDto) {
        //generate the password hash
        const hash = await argo.hash(dto.password);
        
        try {
            //save the new user to the database
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                },
            })
            delete user.hash;
            //return the new user
            return user;
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError) {
                if(error.code === 'P2002') {
                    throw new ForbiddenException('Credentials already exists');
                }
            }
            throw error;
        }
        
    }

    signin() {
        return { msg: 'I have signed in'}
    }
}