import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type ReqUser = {
  id: string;
  email: string;
  role: 'ADMIN' | 'USER';
};

export const ReqUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest() as { user: ReqUser };
    return req.user;
  },
);
