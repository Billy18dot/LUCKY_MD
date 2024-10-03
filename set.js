const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUtpNGtGT28zdUFGU3BOOXpHV0cxb1FXR2FwZEJIYmYrUlRFNGM2VFMyQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMTBGZ2x2TlRJVzJLZno3ai82RnBMcWM5ZERVdlgzSnVtZlRhZFE4SE9Gbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZSzhWNWkzTy82aDhYeCs4Q0szYmRwTFFqTSt6MHpZTzMveE00eSt0TWxjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJacFU0RzdSK1RGL1IyMDdEd0xnYm83eG5SKzdxWlRBSGwxR1hyV2xEUVcwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNFOUhjRUV1c3gzclR5ay9vMzFXdVB3Rkl5YWd3blJEcTJ0WFZuVGpWbFE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNzNjF0VktVTkh0ZEZZNWEzSVNqaW94dmJKbno3ZlJGWUE0Sk9hSkpmM3c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUIrV28yWWdtcEJPbG5jLzVBOGpsMDQxQkpYVDY1OFc5YmhLbnNIODkwUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTjBTeU1xWVNkVEQxdG83a0JTSFZxUjlwZGZoOCtLOGFFY3NnMGlSQUpXRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRpTm9xRit5UDVnR2tWNEEzbWtUb25DRUtIUS85Q3kvekFsbkkzdlBFY2dlY1VQeWhObWlHbFJxR0pYNWkzYVZXQU5aN0pqSGNya3RUQUdFZWZSRUJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjAyLCJhZHZTZWNyZXRLZXkiOiJUMFJBUjREVGRjR1JCaExQREJuTDAzMWNVUHhlRGxvNWxIS2FhY3FCdWpzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ5NGJ1N0pzUlJZR09LcXMtSFl2TjdnIiwicGhvbmVJZCI6ImVmNWVmMDVlLTZjYWItNDgxOS05NmVhLWU2ZWMxZTdlMzMwZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxWlZGWS9wL25jak81NkZ6OFFNeXJyUTd2N1U9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSHFsRHFpQkJYS3lxMVNxRnhZSmUwVVRhLzNnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkFUS0JTVzJSIiwibWUiOnsiaWQiOiIyNjM3ODE1MjYxNDg6NDhAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0kyQWs4QUhFT2F6L0xjR0dBWWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlVTYTYyYXpjSmFUdHJ6V1NXY2F5Ynl5MWxSSkMydUlra21sM1EwOWh0RDg9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImxLeGo0anlQeUNudklRS2VqL0N2dXpiVkpOdmlUdzEvLzRGMmxjbGhJdkh5Q2ZQdzBZakR3QTlORWU1Zk5iajhad201MDhBdlhJSXJMSmp5bElJQ0RnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ1YVVVcWhqSXFQN2k5cE5tRlFxaFcyK2tYbXhXNG9IdVZva1NZc2t1WmYwRWxVa0FLbG84QTU4bGFzajNqWlFJc2lrV2tYc2pjTXRkSjhVQ3g3QUVEdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2Mzc4MTUyNjE0ODo0OEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWRW11dG1zM0NXazdhODFrbG5Hc204c3RaVVNRdHJpSkpKcGQwTlBZYlEvIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI3OTk0MzU4fQ==',
    PREFIXES: (process.env.PREFIX || '.').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "Mr-JONES",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "27613106647",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "off",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'off',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://i.imgur.com/ecRS5BQ.jpeg,https://files.catbox.moe/g73xvl.jpeg,https://files.catbox.moe/qh500b.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'recording',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Harare',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
