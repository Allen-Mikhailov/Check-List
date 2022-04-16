const fs = require("fs")

// Checking for valid files/folders in dir
if (!fs.existsSync("./lists"))
    fs.mkdirSync("./lists")

if (!fs.existsSync("./state.json"))
    fs.writeFileSync("./state.json", JSON.stringify({
         
    }))

const state = JSON.parse(fs.readFileSync("./state.json"))

// Setting up checklists
const { SlashCommandBuilder } = require('@discordjs/builders');

const commands = {
    help: {
        create: () => {
            return new SlashCommandBuilder()
                .setName("help")
                .setDescription("displays a list of commands")
        },
        call: (interaction) => {
            interaction.reply("too lazy to make")
        }
    },
    create: {
        create: () => {
            return new SlashCommandBuilder()
                .setName("create")
                .setDescription("Creates a check list")
                .addStringOption(option =>
                    option.setName('name')
                    .setDescription('The name of the list that will be created')
                    .setRequired(true));
        },
        call: interaction => {
            const path = interaction.options.getString("name")
            if (fs.existsSync("./lists/"+path+".json"))
            {
                interaction.reply("Error: path \""+path+"\" alreay exists")
            } else {
                const newlist = JSON.stringify({
                    metadata: {},
                    items: {}
                })
                fs.writeFileSync("./lists/"+path+".json", newlist)
                interaction.reply("List successfuly created")
            }
        }
    },

    add: {
        create: () => {
            return new SlashCommandBuilder()
                .setName("add")
                .setDescription("adds an item to a check list")
                .addStringOption(option =>
                    option.setName('item')
                    .setDescription('The item that will be added to the list')
                    .setRequired(true));
        },
        call: (interaction) => {
            const item = interaction.item.getString("item")
            if (!state.open)
            {
                interaction.reply("No openned check list \n use /open to open one")
            } else {
                interaction.reply("Successfully added an item to "+state.open)
            }
        }
    },
    open: {
        create: () => {
            return new SlashCommandBuilder()
                .setName("open")
                .setDescription("Opens a list allowing you to view/add to it")
                .addStringOption(option =>
                    option.setName('list')
                    .setDescription('The list to open')
                    .setRequired(true));
        },
        call: interaction => {
            const listname = interaction.options.getString("list")
            if (fs.existsSync("./lists/"+listname+".json"))
            {
                const list = JSON.parse(fs.readFileSync("./lists/"+listname+".json"))
            }
        }
    }

}

module.exports = commands