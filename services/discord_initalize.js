const { Client, GatewayIntentBits, Partials } = require('discord.js');

const discord_client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

const initializeDiscord = async () => {
  discord_client.login(process.env.DISCORD_BOT_TOKEN);

  discord_client.once('ready', async () => {
    console.log('🚀  discord_client ready');
  });
};

module.exports = { discord_client, initializeDiscord };
