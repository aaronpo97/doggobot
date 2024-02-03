# The DoggoBot

The DoggoBot is a Discord bot built in TypeScript using the discord.js library. Its main functionality is to periodically send pictures of dogs to designated channels on Discord servers. It utilizes an open source [dog api](https://dog.ceo/dog-api/) to fetch images of dogs and [CockroachDB](https://www.cockroachlabs.com/) to store information on which channel in which server to send the images to.

## Features

- Sends pictures of dogs to designated channels on Discord servers.
- Utilizes the dog.ceo open-source dog API to fetch images of dogs.
- Uses CockroachDB to store information on channel-server mapping.

## Local Setup

This setup guide assumes that you have a Discord developer account and have bot credentials prepared.

1. Clone the repository:

```bash
git clone https://github.com/yourusername/TheDoggoBot.git
```

2. Install dependencies:

```bash
cd TheDoggoBot
npm install
```

3. Set up environment variables:

- Create a .env file in the root directory.
  Add the following variables:

```env
DISCORD_TOKEN=
CLIENT_ID=
DATABASE_URL=
```

4. Run the bot:

```bash
npm start
```

## Usage

Once the bot is running and added to your Discord server, it will automatically send pictures of dogs to the designated channels at periodic intervals.

## Contributing

Contributions are welcome! Feel free to open issues or pull requests for any improvements or fixes.

## License

This project is licensed under the MIT License.
