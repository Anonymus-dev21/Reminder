import pkg from "whatsapp-web.js";
import qrcodeTerminal from "qrcode-terminal";
import puppeteer from 'puppeteer-core';
import cron from "node-cron";
const { Client, LocalAuth } = pkg;
import dotenv from "dotenv";
dotenv.config();

const numero = process.env.WHATSAPP_NUMBER

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {

       executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            
        ],
    },
    
})

client.on("qr", (qr) => {
    qrcodeTerminal.generate(qr, {small: true});
});



    client.on("ready", () => {
        console.log("Client is ready!");
         cron.schedule(" 0 23 * * *", () => {
            
            const mensaje ="Pastillaamor! t amo mucho";
            client.sendMessage(`${numero}@c.us`, mensaje).then(() => {
                console.log("Mensaje enviado");
            }).catch((error) => {
                console.error("Error al enviar el mensaje:", error);
            })
        })
    })

client.initialize();