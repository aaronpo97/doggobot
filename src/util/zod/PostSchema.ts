import { z } from 'zod';

const PostSchema = z.object({
  message: z.string().url(),
  status: z.string(),
});

export default PostSchema;
