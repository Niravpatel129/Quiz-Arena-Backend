const { discord_client } = require('./discord_initalize');

const sendDiscordMessage = async (discordTag, message) => {
  console.log('🚀  discordTag:', discordTag);
  try {
    let tag = discordTag;
    let secondaryTag = `${discordTag}#0`;

    console.log('🚀  discord_client.guilds', discord_client.guilds);
    const guild = discord_client.guilds.cache.get(process.env.DISCORD_GUILD_ID);

    if (!guild) {
      return console.log('🚀  No guild found');
    }

    guild.members.fetch().then((fetchedMembers) => {
      const user = fetchedMembers.find((member) => {
        return (
          member?.user?.tag?.toLowerCase() === tag?.toLowerCase() ||
          member?.user?.tag?.toLowerCase() === secondaryTag?.toLowerCase()
        );
      });

      if (user) {
        user.send(message);
      }
    });

    // Send to Admin
    guild.members.fetch().then((fetchedMembers) => {
      const adminUser = fetchedMembers.find(
        (member) => member.user.tag.toLowerCase() === 'nirav#0'.toLowerCase(),
      );

      if (adminUser) {
        adminUser.send(message);
      }
    });
  } catch (err) {
    console.log('🚀  err:', err);
  }
};

const sendMessageToChannel = async (channelId, message) => {
  try {
    const channel = await discord_client.channels.fetch(channelId);
    if (!channel) {
      console.error('Channel not found');
      return;
    }
    await channel.send(message);
    console.log(`Message sent to channel ${channelId}`);
  } catch (error) {
    console.error(`Failed to send message to channel ${channelId}:`, error);
  }
};

module.exports = {
  sendDiscordMessage,
  sendMessageToChannel,
};
