require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  PermissionsBitField,
  Partials,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ],
  partials: [Partials.Channel]
});

const PREFIX = process.env.PREFIX || "!";

client.once("ready", () => {
  console.log(`✅ Eingeloggt als ${client.user.tag}`);

 
  client.user.setPresence({
    activities: [{ name: "🎫 Support Tickets", type: 0 }], // "0" = Playing
    status: "online"
  });
});

client.on("messageCreate", async message => {
  if (message.author.bot || !message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();


  if (command === "setup") {
    const embed = new EmbedBuilder()
      .setTitle("🎫 Support Ticket System")
      .setDescription("Klicke unten auf den Button, um ein Ticket zu öffnen.")
      .setColor("Blue");

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("create_ticket")
        .setLabel("🎫 Ticket öffnen")
        .setStyle(ButtonStyle.Primary)
    );

    await message.channel.send({ embeds: [embed], components: [button] });
    await message.reply("✅ Ticket-System erstellt!");
  }
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isButton()) return;


  if (interaction.customId === "create_ticket") {
    const existing = interaction.guild.channels.cache.find(
      c => c.name === `ticket-${interaction.user.id}`
    );

    if (existing)
      return interaction.reply({
        content: "❗ Du hast bereits ein offenes Ticket!",
        ephemeral: true
      });

    const categoryId = interaction.channel.parentId; // 

    const channel = await interaction.guild.channels.create({
      name: `ticket-${interaction.user.id}`,
      type: 0, // Textkanal
      parent: categoryId || null, 
      permissionOverwrites: [
        {
          id: interaction.guild.id,
          deny: [PermissionsBitField.Flags.ViewChannel]
        },
        {
          id: interaction.user.id,
          allow: [
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.SendMessages,
            PermissionsBitField.Flags.ReadMessageHistory
          ]
        }
      ]
    });

    const closeButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("close_ticket")
        .setLabel("❌ Ticket schließen")
        .setStyle(ButtonStyle.Danger)
    );

    const embed = new EmbedBuilder()
      .setTitle("📩 Dein Ticket wurde erstellt!")
      .setDescription("Ein Teammitglied wird sich bald um dich kümmern.\nDrücke ❌, um das Ticket zu schließen.")
      .setColor("Green");

    await channel.send({
      content: `<@${interaction.user.id}>`,
      embeds: [embed],
      components: [closeButton]
    });

    await interaction.reply({
      content: `✅ Dein Ticket wurde erstellt: ${channel}`,
      ephemeral: true
    });
  }

  // ❌ Ticket schließen
  if (interaction.customId === "close_ticket") {
    await interaction.channel.send("🔒 Ticket wird geschlossen in 5 Sekunden...");
    setTimeout(() => {
      interaction.channel.delete().catch(() => {});
    }, 5000);
  }
});

client.login(process.env.TOKEN);
