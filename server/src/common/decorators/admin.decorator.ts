import { SetMetadata } from '@nestjs/common';

export const IS_ROLE_ADMIN = 'isAdmin';
export const Admin = () => SetMetadata(IS_ROLE_ADMIN, true);
