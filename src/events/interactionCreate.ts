import { CacheType, Interaction } from 'discord.js';
import getInfo from '../commands/getInfo';
import help from '../commands/help';
import ping from '../commands/ping';
import pupper from '../commands/pupper';
import registerGuild from '../commands/registerGuild';
import unregisterGuild from '../commands/unregisterGuild';
import updateGuild from '../commands/updateGuild';

const interactionCreate = async (interaction: Interaction<CacheType>) => {
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
    case 'help':
      await help.execute(interaction);
      break;
    default:
      break;
  }
};

export default interactionCreate;
