'use strict';

/**
 * An example of how you can send embeds
 */

// Extract the required classes from the discord.js module
const { Client, MessageEmbed } = require('discord.js');

// Create an instance of a Discord client
const client = new Client();


/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('I am ready!');
  client.user.setActivity(`Piosenki dla dzieci najfajniejsze :slight_smile:`, { type: 'LISTENING' });
});


client.on('message', message => {
  // If the message is "how to embed"
  if (message.content === 'ml!pomoc') {
    // We can create embeds using the MessageEmbed constructor
    // Read more about all that you can do with the constructor
    // over at https://discord.js.org/#/docs/main/master/class/MessageEmbed
    const embed = new MessageEmbed()
      // Set the title of the field
      embed.setTitle('Pomoc')
      // Set the color of the embed
      embed.setColor(0xff0000)
      // Set the main content of the embed
      embed.setDescription('Komendę pomoc poleca 9/10 lekarzy ;)');
	  // Dodaj linijki
	  embed.addFields(
            { name: 'ml!awatar', value: `Wysyła twój awatar`, inline: true },
            { name: 'ml!wyrzuc <osoba>', value: 'Wyrzuca osobe', inline: true },
			{ name: 'ml!banuj <osoba>', value: 'Banuje osobe ||(beta)||', inline: true },
			{ name: 'ml!ping', value: 'Ping, pong! :ping_pong:', inline: true },
      )
    // Send the embed to the same channel as the message
    message.channel.send(embed);
  }
});

// Create an event listener for messages
client.on('message', message => {
  // If the message is "what is my avatar"
  if (message.content === 'ml!awatar') {
    // Send the user's avatar URL
    message.channel.send(message.author.displayAvatarURL());
  }
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Witaj, ${member}`);
});

client.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // If the message content starts with "!kick"
  if (message.content.startsWith('ml!wyrzuc')) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.members.resolve(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member
          .kick('Optional reason that will display in the audit logs')
          .then(() => {
            // We let the message author know we were able to kick the person
            message.channel.send(`Wyrzucono ${member}`);
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            message.channel.send(`Nie mozna wyrzucic ${member}`);
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.channel.send("That user isn't in this guild!");
      }
      // Otherwise, if no user was mentioned
    } else {
      message.channel.send("Powiedz kogo chcesz wyrzucic!");
    }
  }
});

client.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // if the message content starts with "!ban"
  if (message.content.startsWith('ml!banuj')) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.members.resolve(user);
      // If the member is in the guild
      if (member) {
        /**
         * Ban the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         * Read more about what ban options there are over at
         * https://discord.js.org/#/docs/main/master/class/GuildMember?scrollTo=ban
         */
        member
          .ban({
            reason: 'Nieznany, niemozliwy do ustawienia z botem Pan Milusinski',
          })
          .then(() => {
            // We let the message author know we were able to ban the person
            message.channel.send(`Zbanowano ${mention}`);
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to ban the member,
            // either due to missing permissions or role hierarchy
            message.channel.send(`Nie udało się zbanować ${mention}`);
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.channel.send("That user isn't in this guild!");
      }
    } else {
      // Otherwise, if no user was mentioned
      message.channel.send("Oznacz uzytkownika, ktorego chcesz zbanowac!");
    }
  }
});

// Create an event listener for messages
client.on('message', message => {
  // If the message is "ping"
  if (message.content === 'ml!ping') {
    // Send "pong" to the same channel
    message.channel.send(':ping_pong: Pong!');
  }
});

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret