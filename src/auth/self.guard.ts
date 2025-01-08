import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class SelfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const userId = request.params.id;

    if (user.role === 'admin') {
      return true;
    }

    if (user.id !== userId) {
      throw new ForbiddenException('You can only access your own information');
    }

    return true;
  }
}
