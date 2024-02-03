import PostSchema from '../util/zod/PostSchema';

const getRandomPost = async () => {
  const response = await fetch('https://dog.ceo/api/breeds/image/random');
  const json = await response.json();
  const parsed = PostSchema.safeParse(json);

  if (!parsed.success) {
    throw new Error('Failed to parse response from API');
  }

  return parsed.data;
};

export default getRandomPost;
