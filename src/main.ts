import 'dotenv/config';

import { Events } from 'discord.js';
import client from './config/discord/client';
import channelDelete from './events/channelDelete';
import guildDelete from './events/guildDelete';
import clientReady from './events/clientReady';
import interactionCreate from './events/interactionCreate';
import onError from './events/onError';

client.once(Events.ClientReady, clientReady);
client.on(Events.ChannelDelete, channelDelete);
client.on(Events.GuildDelete, guildDelete);
client.on(Events.InteractionCreate, interactionCreate);
client.on(Events.Error, onError);
