-- CreateTable
CREATE TABLE "DiscordGuild" (
    "id" STRING NOT NULL,
    "guildId" STRING NOT NULL,
    "name" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "pupperChannelId" STRING NOT NULL,

    CONSTRAINT "DiscordGuild_pkey" PRIMARY KEY ("id")
);
