import { appRouter } from '@/server/root';
import { httpBatchLink } from '@trpc/client';

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: `${process.env.BASE_URL}/api/trpc`,
    }),
  ],
});
