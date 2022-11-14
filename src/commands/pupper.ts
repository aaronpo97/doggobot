import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import redditResponseSchema from '../schema/redditResponseSchema';
import CommandInterface from './types/CommandInterface';

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

const pupper: CommandInterface = {
  data: new SlashCommandBuilder().setName('pupper').setDescription('Replies with a random pupper!'),
  async execute(interaction) {
    try {
      const posts = await getRarePuppersPosts();
      const randomPost = posts[Math.floor(Math.random() * posts.length)];
      const embed = new EmbedBuilder()
        .setTitle(randomPost.title)
        .setURL(`https://reddit.com${randomPost.permalink}`)
        .setImage(randomPost.url)
        .setFooter({ text: `Posted by u/${randomPost.author}` });

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      await interaction.reply('Something went wrong. Please try again later.');
    }
  },
};

export default pupper;
