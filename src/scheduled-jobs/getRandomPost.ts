import redditResponseSchema from '../schema/redditResponseSchema';

const getRarePuppersPosts = async () => {
  const response = await fetch('https://www.reddit.com/r/rarepuppers.json?limit=100');
  const data = await response.json();

  const posts = redditResponseSchema.parse(data).data.children;

  const filteredAndSortedPosts = posts
    .filter((post) => {
      const postIsVideo = post.data.is_video;
      const postIsHostedOnReddit = post.data.url.startsWith('https://i.redd.it/');

      return !postIsVideo && postIsHostedOnReddit;
    })
    .map((post) => post.data);

  return filteredAndSortedPosts;
};

const getRandomPost = async () => {
  const posts = await getRarePuppersPosts();
  const randomPost = posts[Math.floor(Math.random() * posts.length)];

  return randomPost;
};

export default getRandomPost;
