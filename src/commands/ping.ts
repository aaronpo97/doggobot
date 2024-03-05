import { SlashCommandBuilder } from 'discord.js';
import Command from '../util/Command';

const ping = new Command(
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription(`Gets the bot's latency in milliseconds.`),
  async (interaction) => {
    await interaction.reply(
      `Pong! Latency is ${Date.now() - interaction.createdTimestamp}ms.`,
    );
  },
);

export default ping;
