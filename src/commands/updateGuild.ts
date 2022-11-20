import { SlashCommandBuilder } from 'discord.js';
import { updateGuildById, getGuildById } from '../database/services/DiscordGuildServices';
import commandWrapper from '../util/commandWrapper';
import CommandInterface from './types/CommandInterface';

const updateGuild: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('updateguild')
    .setDescription('Update the pupper channel for your server.')
    .addChannelOption((option) =>
      option
        .setName('pupper-channel')
        .setDescription('The channel where the bot will periodically post a rare pupper.')
        .setRequired(true),
    )
    .setDefaultMemberPermissions(0),

  execute: commandWrapper(async (interaction) => {
    const guild = await getGuildById(interaction.guildId!);
    if (!guild) {
      await interaction.reply("You haven't registered your server yet!");
      return;
    }

    const pupperChannel = interaction.options.get('pupper-channel')!.value!.toString();
    const channelId = pupperChannel.replace(/\D/g, '');

    await updateGuildById({ guildId: interaction.guildId!, pupperChannelId: channelId });
    await interaction.reply('Pupper channel updated!');
  }),
};

export default updateGuild;
