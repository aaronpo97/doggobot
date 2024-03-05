import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

import { format } from 'date-fns';

import GithubAPISchema from '../util/zod/GithubAPIResponseSchema';
import Command from '../util/Command';

const repo = new Command(
  new SlashCommandBuilder()
    .setName('repo')
    .setDescription('Send the GitHub repository information.'),

  async (interaction) => {
    const username = 'aaronpo97';
    const repoName = 'rarepuppers';
    const apiUrl = `https://api.github.com/repos/${username}/${repoName}`;

    const response = await fetch(apiUrl);
    const json = await response.json();
    const parsed = GithubAPISchema.safeParse(json);

    if (!parsed.success) {
      await interaction.reply('There was an error with the request.');
      return;
    }

    const { data } = parsed;

    const embed = new EmbedBuilder()
      .setTitle(data.name)
      .setURL(data.html_url)
      .setDescription(data.description)
      .addFields({
        name: 'Owner',
        value: data.owner.html_url,
      })
      .addFields({
        name: 'License',
        value: data.license.name,
      })
      .addFields({
        name: 'Open Issues',
        value: data.open_issues.toString(),
      })
      .addFields({
        name: 'Forks',
        value: data.forks.toString(),
      })
      .setFooter({
        text: `Last updated on: ${format(data.updated_at, 'MM/dd/yyyy')} at ${format(data.updated_at, 'HH:mm:ss')}`,
      });

    await interaction.reply({ embeds: [embed] });
  },
);

export default repo;
