import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { IS_ROLE_ADMIN } from '../decorators/admin.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const checkMetadataPublic = this.getMetadata(context, IS_PUBLIC_KEY);
    if (checkMetadataPublic) return !!checkMetadataPublic;
    const req = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req);
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    try {
      const payload = await this.jwtService.verify(token, { secret: 'secret' });
      req['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException('Verify token is fail');
    }
    const checkMetadataAdmin = this.getMetadata(context, IS_ROLE_ADMIN);
    const checkIsNotAdmin = !req['user'] || req['user'].role !== 'ADMIN';
    if (checkMetadataAdmin && checkIsNotAdmin) {
      throw new ForbiddenException('Cannot access this route');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }

  private getMetadata(context: ExecutionContext, key: string) {
    const metadata = this.reflector.getAllAndOverride<boolean>(key, [
      context.getHandler(),
      context.getClass(),
    ]);
    return metadata;
  }
}
