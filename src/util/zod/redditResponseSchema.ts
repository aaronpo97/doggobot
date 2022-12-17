import { z } from 'zod';
import pupperPostSchema from './pupperPostSchema';

const redditResponseSchema = z.object({
  data: z.object({
    children: z.array(
      z.object({
        data: pupperPostSchema,
      }),
    ),
  }),
});

export default redditResponseSchema;
