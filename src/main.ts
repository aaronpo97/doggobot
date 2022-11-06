import 'dotenv/config';
import 'reflect-metadata';
import { Events } from 'discord.js';
import client from './config/discord/client';

import registerCommands from './config/discord/deployCommands';
import ping from './commands/ping';
import pupper from './commands/pupper';
import registerGuild from './commands/registerGuild';
import AppDataSource from './database/AppDataSource';

const token = process.env.DISCORD_TOKEN;

// create a new Discord discordBotClient

client.once(Events.ClientReady, async () => {
  await registerCommands();
  console.log(`Logged in as ${client.user!.tag}`);
  await AppDataSource.initialize();
});

// client.on(Events.MessageCreate, async (message) => {
//   // get rare puppers posts

//   const content = message.content.toLowerCase();

//   if (content === '!registerchannel') {
//     await AppDataSource.createQueryBuilder()
//       .update(DiscordGuild)
//       .set({ pupperChannelId: message.channelId })
//       .where('guildId = :guildId', { guildId: message.guildId! })
//       .execute();

//     message.channel.send('Channel registered!');
//   }

//   if (content === '!info') {
//     console.log(message.guildId);
//     const guild = await AppDataSource.createQueryBuilder()
//       .select()
//       .from(DiscordGuild, 'guild')
//       .where('guild.guildId = :guildId', { guildId: message.guildId! })
//       .getOne();

//     console.log(guild);

//     if (!guild) {
//       message.channel.send('Guild not registered!');
//       return;
//     }

//     message.channel.send(JSON.stringify(guild));
//   }
// });

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
    default:
      break;
  }
});

client.login(token);
