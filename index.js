require('dotenv').config();
const { Client, IntentsBitField, AttachmentBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');
const context = require('./context');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// EVENTS
client.on('ready', (c) => {
  console.log(`Logged in as ${c.user.tag}!`);
});

const msgLengthLimit = 2000;
client.on('messageCreate', async (message) => {
  try {
    if (message.author.bot) return;
    if (message.channel.id !== process.env.CHAT_BOT_CHANNEL) return;
    if (message.content.startsWith('!')) return;

    await message.channel.sendTyping();
//입력한 글자의 수가 2000자가 넘으면 요약해 달라고 응답하는 것이다.
    if (message.content.length > msgLengthLimit) {
      message.reply("Whoa now, I'm not going to read all that. Maybe summarize?");
      return;
    }

    let prevMessages = await message.channel.messages.fetch({ limit: 15 });
    prevMessages = prevMessages.sort((a, b) => a - b);

    let conversationLog = [{ role: 'system', content: context }];

    prevMessages.forEach((msg) => {
      if (msg.content.startsWith('!')) return;
      if (msg.content.length > msgLengthLimit) return;
      if (msg.author.id !== client.user.id && message.author.bot) return;

      // If msg is from the bot (client) itself(이봇 어드민이 사용할때)
      if (msg.author.id === client.user.id) {
        conversationLog.push({
          role: 'assistant',
          content: `${msg.content}`,
        });
      }

      // If msg is from a regular user(일반 사용자가 사용할때)
      else {
        if (msg.author.id !== message.author.id) return;

        conversationLog.push({
          role: 'user',
          content: `${msg.content}`,
        });
      }
    });

    const res = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: conversationLog,
    });

    let reply = res.data.choices[0].message?.content;

    if (reply?.length > 2000) {
      // 응답 길이가 2000자가 넘으면 txt파일로 올린다. 
      const buffer = Buffer.from(reply, 'utf8');
      const txtFile = new AttachmentBuilder(buffer, { name: `${message.author.tag}_response.txt` });

      message.reply({ files: [txtFile] }).catch(() => {
        message.channel.send({ content: `${message.author}`, files: [txtFile] });
      });
    } else {
      message.reply(reply).catch(() => {
        message.channel.send(`${message.author} ${reply}`);
      });
    }
  } catch (error) {
    message.reply(`Something went wrong. Try again in a bit.`).then((msg) => {
      setTimeout(async () => {
        await msg.delete().catch(() => null);
      }, 5000);
    });

    console.log(`Error: ${error}`);
  }
});

client.login(process.env.TOKEN);
