import { z } from 'zod';
import redisClient from '../config/redis/redisClient';
import pupperPostSchema from '../schema/pupperPostSchema';

const getRandomPost = async () => {
  const posts = await redisClient.json.get('puppers');

  if (!posts) {
    return null;
  }

  const puppers = z.array(pupperPostSchema).parse(posts);
  const randomPupper = puppers[Math.floor(Math.random() * puppers.length)];

  await redisClient.json.set(
    'puppers',
    '.',
    puppers.filter((post) => post.title !== randomPupper.title),
  );

  return randomPupper;
};

export default getRandomPost;
