import DiscordGuild from '../model/DiscordGuild';

interface GuildServicesArgs {
  guildId: string;
  name: string;
  pupperChannelId: string;
}

export const getGuildById = async (id: string) => {
  const guild = await DiscordGuild.findOne({ where: { guildId: id } });
  return guild;
};

export const createGuild = async ({ guildId, name, pupperChannelId }: GuildServicesArgs) => {
  const guild = new DiscordGuild();
  guild.guildId = guildId;
  guild.name = name;
  guild.pupperChannelId = pupperChannelId;
  guild.createdAt = new Date();

  return guild.save();
};

export const updateGuildById = async ({
  guildId,
  name,
  pupperChannelId,
}: Partial<GuildServicesArgs>) => {
  if (!guildId) {
    throw new Error('Guild id is required');
  }

  const guild = await getGuildById(guildId);

  if (!guild) {
    throw new Error('Guild not found');
  }

  guild.name = name || guild.name;
  guild.pupperChannelId = pupperChannelId || guild.pupperChannelId;

  return guild.save();
};

export const deleteGuild = async (id: string) => {
  const guild = await getGuildById(id);

  if (!guild) {
    throw new Error('Guild not found');
  }

  return guild.remove();
};

export const getAllGuilds = async () => {
  const guilds = await DiscordGuild.find();
  return guilds;
};
