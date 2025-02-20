export { default } from 'next-auth/middleware';

// apply only to following routes
export const config = { matcher: ['/'] };
