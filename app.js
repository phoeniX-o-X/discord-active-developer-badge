const { createInterface } = require('node:readline');
const { execSync } = require('child_process');
const fetch = require('node-fetch');
const { Client, Routes } = require('discord.js');

const ping = {
  name: 'who is Phoenix?',
  description: 'well phoenix is actully the bot developer'
};


// Command Example
const command2 = {
  name:'sad',
  description:'https://images-ext-2.discordapp.net/external/og_77KbMpost4QtyEV6pGhCdgEUP-SgGckAPhSDE4jU/%3Fcid%3D73b8f7b1f4d9373cd7d465f51c9c073c0740093af1b57d5f%26rid%3Dgiphy.mp4%26ct%3Dg/https/media4.giphy.com/media/ISOckXUybVfQ4/giphy.mp4'
}

const commands = [ping, command2]; // Add your commands with commas to add them to the bot!
// Join the Discord for support: https://discord.gg/M5MSE9CvNM

const client = new Client({ intents: [] });
const rl = createInterface({ input: process.stdin, output: process.stdout });


client.on('interactionCreate', (interaction) => {
  if (interaction.commandName === 'ping') {
    interaction.reply('yes');  
  } else if(interaction.commandName === 'command2') { // This is the example command's name!
    interaction.reply('example command');
  } else { // a response if you forget to add the command here
    interaction.reply('this command\'s response has not been added yet!');
  }
});

const question = (q) => new Promise((resolve) => rl.question(q, resolve));
(async ()=>{
  const token = await question('Application token? ');
  if(!token) throw new Error('Invalid token');

  const ratelimitTest = await fetch(`https://discord.com/api/v9/invites/discord-developers`);

  if(!ratelimitTest.ok) {
    await question(`Uh oh, looks like the node you're on is currently being blocked by Discord. Press the "Enter" button on your keyboard to be reassigned to a new node. (you'll need to rerun the program once you reconnect)`)

    // This kills the container manager on the repl forcing Replit to assign the repl to another node with another IP address (if the ip is globally rate limited)
    //^ in short: Restarts the bot to be used again/attempted to start up again!
    execSync('kill 1');
    return;
  };
  
  await client.login(token).catch((err) => {
    throw err
  });

  await client.rest.put(Routes.applicationCommands(client.user.id), { body: commands });

  console.log('DONE | Application/Bot is up and running. DO NOT CLOSE THIS TAB UNLESS YOU ARE FINISHED USING THE BOT, IT WILL PUT THE BOT OFFLINE.');
})();
