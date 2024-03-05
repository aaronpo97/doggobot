/* eslint-disable no-unused-vars */

import { CommandInteraction, CacheType, Client, SlashCommandBuilder } from 'discord.js';

export default interface ICommand {
  data: SlashCommandBuilder | Partial<SlashCommandBuilder>;
  execute(interaction: CommandInteraction<CacheType>, client?: Client): Promise<void>;
}
