import { SlashCommandBuilder } from 'discord.js';
import commandWrapper from '../util/commandWrapper';
import CommandInterface from './types/CommandInterface';

const ping: CommandInterface = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),

  execute: commandWrapper(async (interaction) => {
    await interaction.reply(`Pong! Latency is ${Date.now() - interaction.createdTimestamp}ms.`);
  }),
};

export default ping;
