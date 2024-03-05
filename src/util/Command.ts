import { SlashCommandBuilder, CommandInteraction, CacheType, Client } from 'discord.js';
import ICommand from '../commands/types/ICommand';
import commandWrapper from './commandWrapper';

type Data =
  | SlashCommandBuilder
  | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
type Execute = (
  interaction: CommandInteraction<CacheType>,
  client?: Client,
) => Promise<void>;

export default class Command implements ICommand {
  data: Data;

  execute: Execute;

  constructor(data: Data, execute: Execute) {
    this.data = data;
    this.execute = commandWrapper(execute);
  }
}
