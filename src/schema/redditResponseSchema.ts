import { z } from 'zod';

const redditResponseSchema = z.object({
  data: z.object({
    children: z.array(
      z.object({
        data: z.object({
          title: z.string(),
          ups: z.number(),
          author: z.string(),
          permalink: z.string(),
          url: z.string(),
          created_utc: z.number(),
          is_video: z.boolean(),
        }),
      }),
    ),
  }),
});

export default redditResponseSchema;
