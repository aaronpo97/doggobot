import { CacheType, Interaction } from 'discord.js';

import fs from 'fs/promises';

const interactionCreate = async (interaction: Interaction<CacheType>) => {
  if (!interaction.isCommand()) return;
  const commandFiles = await fs.readdir('./src/commands');

  const commands = commandFiles.map(async (file) => {
    if (file.includes('types')) return;

    const commandImport = (await import(
      `../commands/${file}`
    )) as typeof import('../commands/ping');

    return commandImport.default;
  });

  const command = await commands.find(async (c) => {
    if (!c) return;
    const command = await c;
    return command;
  });

  if (!command) return;

  await command.execute(interaction);
};

export default interactionCreate;
