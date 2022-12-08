import { createClient } from 'redis';

const { REDIS_URL } = process.env;

if (!REDIS_URL) {
  throw new Error('Missing Redis URL');
}

const redisClient = createClient({
  url: REDIS_URL,
});

export default redisClient;
