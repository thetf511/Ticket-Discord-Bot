# 🎫 Discord Support Ticket Bot (2025)

![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?style=for-the-badge&logo=node.js)  
![Discord.js](https://img.shields.io/badge/discord.js-v14-blue?style=for-the-badge&logo=discord)  
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)  
![Status](https://img.shields.io/badge/Status-Stable-success?style=for-the-badge)  
![Maintained](https://img.shields.io/badge/Maintained-Yes-informational?style=for-the-badge)

A modern, lightweight, and ready-to-use **Support Ticket Bot for Discord**, designed for communities, support teams, and any project that needs a clean, fast, and reliable ticket system.

---

## 🚀 Features

### 🎟️ Ticket System
- 🔘 Create support tickets via button  
- 🚫 Automatic check: "Does the user already have a ticket?"  
- 🔐 Private support channels (User + Staff only)  
- 🗂️ Smart category detection (uses the category of the setup panel)  
- ❌ Close-button deletes the ticket after 5 seconds  

### 💡 Modern & Clean
- 🖼️ Modern Discord embeds & button interface  
- ⚙️ Built on **discord.js v14**  
- 🎮 Custom bot presence: "🎫 Support Tickets"

### 🧩 Easily Extendable
Perfect foundation for transcripts, logging, slash commands, staff roles, and more.

---

## 📦 Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/thetf511/Ticket-Discord-Bot.git
cd Ticket-Discord-Bot

2️⃣ Install dependencies
npm install

3️⃣ put in the .env file
TOKEN=your_discord_bot_token
PREFIX=!

▶️ Run the bot
node index.js

🛠️ Server Setup

Go to any channel on your Discord server

Type:

!setup


The bot will create a modern ticket panel with the button 🎫 Open Ticket.

🧠 How It Works
📩 Creating a Ticket

User clicks the 🎫 button

Bot creates a channel named: ticket-USERID

Permissions are automatically configured

Sends an embed with a ❌ "Close Ticket" button

🔒 Closing a Ticket

Press ❌

The channel is deleted after 5 seconds

✨ Code Highlights

✔️ Smart category detection
✔️ Minimal and clean codebase
✔️ Fully interaction-based (Buttons & Embeds)
✔️ No unnecessary dependencies
✔️ Perfect base for future addons

🧱 Requirements

Node.js 18+

Discord bot permissions:

Manage Channels

Manage Permissions

View Channels

Send Messages
