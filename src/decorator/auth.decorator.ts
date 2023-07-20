import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
// skip auth
export const PublicRoutes = () => SetMetadata(IS_PUBLIC_KEY, true);
