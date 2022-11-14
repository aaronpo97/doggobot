import 'dotenv/config';
import 'reflect-metadata';
import { Events } from 'discord.js';
import client from './config/discord/client';

import registerCommands from './config/discord/deployCommands';
import ping from './commands/ping';
import pupper from './commands/pupper';
import registerGuild from './commands/registerGuild';
import AppDataSource from './database/AppDataSource';
import getInfo from './commands/getInfo';
import unregisterGuild from './commands/unregisterGuild';
import updateGuild from './commands/updateGuild';

const token = process.env.DISCORD_TOKEN;

// create a new Discord discordBotClient

client.once(Events.ClientReady, async () => {
  await registerCommands();
  console.log(`Logged in as ${client.user!.tag}`);
  await AppDataSource.initialize();
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isCommand()) return;
  switch (interaction.commandName) {
    case 'ping':
      await ping.execute(interaction);
      break;
    case 'pupper':
      await pupper.execute(interaction);
      break;
    case 'registerguild':
      await registerGuild.execute(interaction);
      break;
    case 'getinfo':
      await getInfo.execute(interaction);
      break;
    case 'unregisterguild':
      await unregisterGuild.execute(interaction);
      break;
    case 'updateguild':
      await updateGuild.execute(interaction);
      break;
    default:
      break;
  }
});

client.login(token);
