import { SlashCommandBuilder, TextChannel } from 'discord.js';
import { getGuildById } from '../database/services/DiscordGuildServices';
import { sendPupperToChannel } from '../scheduled-jobs/sendPuppers';
import commandWrapper from '../util/commandWrapper';
import CommandInterface from './types/CommandInterface';

const test: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Trigger a pupper message to be sent to the registered pupper channel.')
    .setDefaultMemberPermissions(0),

  execute: commandWrapper(async (interaction) => {
    const guild = await getGuildById(interaction.guildId!);

    if (!guild) {
      await interaction.reply('Your guild is not registered!');
      return;
    }

    const pupperChannel = interaction.client.channels.cache.get(guild.pupperChannelId);

    if (!pupperChannel) {
      await interaction.reply('Your guild is not registered!');
      return;
    }

    await sendPupperToChannel(pupperChannel as TextChannel);

    await interaction.reply('Pupper sent!');
  }),
};

export default test;
