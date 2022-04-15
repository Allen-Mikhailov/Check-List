const fs = require("fs")

// Setting up checklists
const { SlashCommandBuilder } = require('@discordjs/builders');

function profilecheck(user)
{
    
}

const commands = {
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
                    option.setName('name')
                    .setDescription('The name of the list that will be created')
                    .setRequired(true));
        }
    }

}

module.exports = commands