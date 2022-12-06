module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        let servers = await client.guilds.cache.size
        let servercount = await client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)
        console.log(`${client.user.tag} is online, Watching ${servers} Servers and ${servercount} Members`)

        async function pickPresence() {
            const option = Math.floor(Math.random() * statusArray.length);

            try {
                await client.user.setPresence({
                    activities: [
                        {
                            name: statusArray[option].content,
                            type: statusArray[option].type,

                        },

                    ],

                    status: statusArray[option].status
                })
            } catch (error) {
                console.error(error);
            }
        }
    },
};