import { SlashCommandBuilder } from 'discord.js';
import CommandInterface from './types/CommandInterface';

const ping: CommandInterface = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),

  async execute(interaction) {
    console.log('ping');
    await interaction.reply('Pong!');
  },
};

export default ping;
