# Website Uptime Discord Bot

![GitHub](https://img.shields.io/github/license/6im0n/Status-Bot-Discord-Bot/)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/6im0n/Status-Bot-Discord-Bot/)
![GitHub last commit](https://img.shields.io/github/last-commit/6im0n/Status-Bot-Discord-Bot/)

A Discord bot that monitors the uptime of websites and sends notifications when they go down or when they become operational again. You can configure the channel to receive notifications, specify the websites to monitor, and customize the messages sent when the server goes down and when it comes back up.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Features

- Monitors the uptime of websites.
- Sends notifications to a specified Discord channel when a website goes down.
- Sends notifications when a website becomes operational again.
- Allows customization of notification messages.
- Easy to configure and use.

## Getting Started

Follow these instructions to get the bot up and running on your Discord server.

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your server.

### Installation

1. Clone this repository to your local machine or server.

```bash
git clone https://github.com/yourusername/website-uptime-bot.git
```

2. Navigate to the bot's directory and install the required dependencies.
   
```bash
cd website-uptime-bot
npm install
```

3. Create a Discord Bot and get your bot token. You can follow the official Discord Developer Portal to create a new bot.

https://discord.com/developers/applications

4. Create a Discord Bot and get your bot token. You can follow the official Discord Developer Portal to create a new bot.
Create a .env file in the project directory with the following content:
```
CLIENT_TOKEN="YOUR_DISCORD_TOKEN"
CHANNEL_ID="Id of the channel you want to receive message"
URL_TO_PING="website "you want to ping"
````

5. Start the bot.
   
```bash
node bot.js
```
The bot should now be up and running, monitoring the specified website and sending notifications to the configured Discord channel.

##Usage

Once the bot is running, it will automatically check the specified websites for uptime. You can interact with the bot using Discord commands to configure settings, check the current status, and more.
(feature will come soon)

##Contributing

If you would like to contribute to this project, feel free to submit a pull request with your changes or open an issue for any suggestions or bug reports.

