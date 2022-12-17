import { z } from 'zod';

const pupperPostSchema = z.object({
  title: z.string(),
  ups: z.number(),
  author: z.string(),
  permalink: z.string(),
  url: z.string(),
  created_utc: z.number(),
  is_video: z.boolean(),
});

export default pupperPostSchema;
