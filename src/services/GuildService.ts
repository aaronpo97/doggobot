import { PrismaClient } from '@prisma/client';

interface GuildServicesArgs {
  guildId: string;
  name: string;
  pupperChannelId: string;
}

export default class GuildService {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getGuildById(id: string) {
    const guild = await this.prisma.discordGuild.findFirst({
      where: { guildId: id },
    });
    return guild;
  }

  async createGuild({ guildId, name, pupperChannelId }: GuildServicesArgs) {
    const guild = await this.prisma.discordGuild.create({
      data: {
        guildId,
        name,
        pupperChannelId,
        createdAt: new Date(),
      },
    });
    return guild;
  }

  async updateGuildById({ guildId, name, pupperChannelId }: Partial<GuildServicesArgs>) {
    if (!guildId) {
      throw new Error('Guild id is required');
    }
    const guild = await this.getGuildById(guildId);
    if (!guild) {
      throw new Error('Guild not found');
    }
    const updatedGuild = await this.prisma.discordGuild.update({
      where: { id: guild.id },
      data: {
        name: name || guild.name,
        pupperChannelId: pupperChannelId || guild.pupperChannelId,
      },
    });
    return updatedGuild;
  }

  async deleteGuild(id: string) {
    const guild = await this.getGuildById(id);
    if (!guild) {
      throw new Error('Guild not found');
    }
    return this.prisma.discordGuild.delete({
      where: { id: guild.id },
    });
  }

  async getAllGuilds() {
    const guilds = await this.prisma.discordGuild.findMany();
    return guilds;
  }
}
