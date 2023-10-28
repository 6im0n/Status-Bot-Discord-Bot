require("dotenv").config();
const axios = require('axios');
const { Client, GatewayIntentBits, Partials } = require('discord.js');

const channel_status_id = process.env.CHANEL_ID;
const serverUrl = process.env.URL_TO_PING;
let isDown = true;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // give acces to guilds
    GatewayIntentBits.GuildMessages, // give acces to messages on the guilds
    GatewayIntentBits.MessageContent // give acces to message content on the guilds
  ],
  partials: [
    Partials.Channel // give acces to channel
  ]
});

async function pingServer(url) {
  try {
    const response = await axios.get(url, { timeout: 800 });
    if (response.status === 200) {
      if (isDown) {
        console.log(`Server at ${url} is up and running.`);
        client.channels.cache.get(channel_status_id).send(`Server at ${url} is up and running.`)
      }
      isDown = false;

    } else {
      if (!isDown) {
        console.log(`Server at ${url} returned an unexpected status code: ${response.status}`);
        client.channels.cache.get(channel_status_id).send(`Server at ${url} returned an unexpected status code: ${response.status}`)
      }
      isDown = true;
    }
  } catch (error) {
    if (!isDown) {
      console.log(`Server at ${url} is down or unreachable. Error: ${error.message}`);
      client.channels.cache.get(channel_status_id).send(`Server at ${url} is down or unreachable. Error: ${error.message}`)
      isDown = true;
    }
  }
}

client.on("ready", () => {
  console.log("I am ready!");
  client.user.setPresence({status: 'online', activities: [{name: 'To ping server'}]});
  pingServer(serverUrl);
});

setInterval(() => {
  pingServer(serverUrl);
}, 120000);

client.on("messageCreate", (message) => {
  if (message.content.startsWith("help")) {
    message.channel.send("en cours de dev");
  }
});


client.login(process.env.CLIENT_TOKEN);
