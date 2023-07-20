import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/entities/auth.entity';

export interface RequestWithUser extends Request {
  user: User;
} 

@Injectable()
export class LocalAuthenticationGuard extends AuthGuard('local') {

}
