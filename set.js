const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0cxT1RxRjl3RFJDNnhLUUd5MHhlY0xlb0pUdnBYRVRjamZnWHFtNDdFZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNXdlajh3VGJyUlpWb3FRTGF1ajFTWGFJRVcxdlpxeFZWMWlOeEJOVzBSdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLTkRJczJoK2JlKzhLaWNqM2RWbUtaSTlvQmJkb2JNWi9EM0NPcWFWTzFnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLMlV1cEpQZGxkMWpsMWloaE9BbHNOVnJKc292T1o2Mk83RkY0NWxncmxBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklGc0gvaUw4L0V5NUlIUWQ2VnR1SWlqMnJxWHhualU1UVc1bVFJRFJqMkU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkYwb1FHTVJIL2dKZ2d5UGk0djdNODRxRGs5cTNPaWh6N0ZYbG0wcDZSSHc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUZGWWFORlpjYVlIenNMR2EvQ3doNDFmcGJRa2ZuSUI0MlRGMWtzeU8wbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWVpYb0s4NDZEbm55WlNGUEszV1dhRkNSZlZtNVBMK2JLU09oeWZOOU94az0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdXQ2w4NC9QZXNRejNQdldCc0dwN3lreDVYOFkrY1VGaXlKOHZETWZCampiYXlwYWpHLzZqS0xIRnNhQ29pRm9MSU9QYlhWTVR6R0dNcVlMZWdJbWlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTA0LCJhZHZTZWNyZXRLZXkiOiI2TGY5aTdyTHpXdVpLeDFUZko1TjZHMGRsRkRibDk1UkRHSTc0NWRMNzJBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJjN2g1WHZHRFFOMm1VaE9jdnJFSWpBIiwicGhvbmVJZCI6IjRhZWI4MDE3LTAwODMtNGNmMC1hYjE3LWY2NmZiYzk4YzY4MCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxTUE3ZTFlTlVJTnRLc1U4MEJQRThVR09JSkk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidkRmL2o3SzFmMkRlSS9lb1h6Rm5LQUkzSlJvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ilg5UTdCS1k2IiwibWUiOnsiaWQiOiIyNjM3ODE1MjYxNDg6NzZAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiRm9yw6ppZ27DqnIifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xEVXJDZ1FqS2J4dWdZWUN5QUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlRzT011VVBqS21vN3hXRUdXbEtxWDFWZFh1Ylc4enpVZWpybitwei9LZzQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjRBUmYzdTRvUk91QXFLNEY5cXQwSXpYbCtkcytVMjZLeUVkZ01rTWtaSFVmcVA5VjdoS254ZlYxeFFBQ01ZcGNISTFEVHpFMXFBM1hSaEc0VC9kN0N3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJYY0pmblZNRnVwQlBLbmtXQklacktOK1Nxc1NQdldFL1N5aG1UelN0Y3VHYXRnVTB0TWJjSEl3bU1NN1FFMUJGL3hjdm9PSkowUE8rMmRGbnlIUXBpUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2Mzc4MTUyNjE0ODo3NkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVN0RqTGxENHlwcU84VmhCbHBTcWw5VlhWN20xdk04MUhvNjUvcWMveW9PIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM0MTAzODM1LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUZSTSJ9',
    PREFIXE: process.env.PREFIX || "®",
    OWNER_NAME: process.env.OWNER_NAME || "Mr-Jones",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "27781242411",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Lucky_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'no',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
