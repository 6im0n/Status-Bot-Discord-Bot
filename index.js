require("dotenv").config();
const axios = require('axios');
const { Client, GatewayIntentBits, Partials, EmbedBuilder  } = require('discord.js');

const channel_status_id = process.env.CHANNEL_ID;
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

const serverDownEmbeded = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Le serveur à arrêté de fonctionner 🤯')
	.setAuthor({ name: 'Serveur non disponible', iconURL: 'https://github.com/jellyfin/jellyfin-ux/blob/master/branding/tizen/icon.png?raw=true', url: 'https://discord.js.org' })
	.setThumbnail('https://github.com/jellyfin/jellyfin-ux/blob/master/branding/tizen/icon.png?raw=true')
	.setImage('https://media.giphy.com/media/WpaVhEcp3Qo2TjwyI1/giphy.gif')
	// .setTimestamp(Date.now())

const serverUPEmbeded = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Le serveur fonctionne de nouveau ✨')
	.setAuthor({ name: 'Serveur actif !', iconURL: 'https://github.com/jellyfin/jellyfin-ux/blob/master/branding/tizen/icon.png?raw=true', url: 'https://discord.js.org' })
	.setThumbnail('https://github.com/jellyfin/jellyfin-ux/blob/master/branding/tizen/icon.png?raw=true')
	.setImage('https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGwyYm51aG84NWhqNHgzZjBxcGw3dnpub3owbm1wNTE1ODFoODkzZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8nmb8m82jbLfa/giphy.gif')
	// .setTimestamp(Date.now())


async function pingServer(url) {
  try {
    const response = await axios.get(url, { timeout: 4500 });
    if (response.status === 200) {
      if (isDown) {
        console.log(`Server at ${url} is up and running.`);
        client.channels.cache.get(channel_status_id).send({embeds: [serverUPEmbeded]});
        client.user.setPresence({status: 'online', activities: [{name: 'Streaming is Online 🟢'}]});
      }
      isDown = false;

    } else {
      if (!isDown) {
        console.log(`Server at ${url} returned an unexpected status code: ${response.status}`);
        client.channels.cache.get(channel_status_id).send({embeds: [serverDownEmbeded]});
        client.user.setPresence({status: 'dnd', activities: [{name: 'Streaming is offline 🔴'}]});
      }
      isDown = true;
    }
  } catch (error) {
    if (!isDown) {
      console.log(`Server at ${url} is down or unreachable. Error: ${error.message}`);
      client.channels.cache.get(channel_status_id).send({embeds: [serverDownEmbeded]});
      client.user.setPresence({status: 'dnd', activities: [{name: 'Streaming is offline 🔴'}]});
      isDown = true;
    }
  }
}

client.on("ready", () => {
  console.log("I am ready!");
  client.user.setPresence({status: 'online', activities: [{name: 'To ping server 🟢'}]});
  pingServer(serverUrl);
});

setInterval(() => {
  pingServer(serverUrl);
}, 35000);

client.on("messageCreate", (message) => {
  if (message.content.startsWith("ping")) {
    // Record the start time
    const startTime = new Date().getTime();
    try {
      // Make Axios request
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');

      // Record the end time
      const endTime = new Date().getTime();

      // Calculate the time taken
      const timeTaken = endTime - startTime;

      // Log the response and time taken
      console.log('Axios Response:', response.data);
      console.log('Time Taken:', timeTaken, 'milliseconds');
      message.channel.send("Le serveur à repondu en: ", timeTaken);
    } catch (error) {
      // Handle errors
       message.channel.send('Axios Request Failed:', error);
    }
  }
});


client.login(process.env.CLIENT_TOKEN);
