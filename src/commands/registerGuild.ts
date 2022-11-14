import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { createGuild, getGuildById } from '../database/services/DiscordGuildServices';
import CommandInterface from './types/CommandInterface';

const registerGuild: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('registerguild')
    .setDescription('Registers your server.')
    .addChannelOption((option) =>
      option
        .setName('pupper-channel')
        .setDescription('The channel where the bot will periodically post a rare pupper.')
        .setRequired(true),
    ),

  async execute(interaction) {
    try {
      if (await getGuildById(interaction.guildId!)) {
        await interaction.reply('Your guild is already registered.');
        return;
      }

      const pupperChannel = interaction.options.get('pupper-channel')!.value!.toString();

      const channel = pupperChannel.replace(/\D/g, '');
      const guild = await createGuild({
        guildId: interaction.guildId!,
        pupperChannelId: channel,
        name: interaction.guild!.name,
      });

      const embed = new EmbedBuilder().setTitle('Guild Registered!').addFields([
        { name: 'Guild Name', value: guild.name },
        { name: 'Pupper Channel', value: `<#${guild.pupperChannelId}>` },
      ]);

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      await interaction.reply(
        'Something went wrong while registering your guild. Please try again later.',
      );
    }
  },
};

export default registerGuild;
