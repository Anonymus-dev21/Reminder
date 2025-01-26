import pkg from "whatsapp-web.js";
import pkg2 from "node-cron-tz";
import qrcodeTerminal from "qrcode-terminal";
import cron from "node-cron";
import puppeteer from "puppeteer";
import express from "express";
const { schedule } = pkg2
const { Client, LocalAuth } = pkg;

import dotenv from "dotenv";
dotenv.config();

const numero = process.env.WHATSAPP_NUMBER

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
        ]
    },
    
})

client.on("qr", (qr) => {
    qrcodeTerminal.generate(qr, {small: true});
});


const app = express();
const port = process.env.PORT || 4000;
app.get("/send", (req, res) => {
    client.sendMessage(`5493487216141@c.us`, "Generando log").then(() => {
                console.log("Mensaje enviado");
            }).catch((error) => {
                console.error("Error al enviar el mensaje:", error);
            })
            res.send("Bot activo");
        })
   


    client.on("ready", () => {
        console.log("Client is ready!");
         cron.schedule(" 0 23 * * *", {timezone: "America/Argentina/Buenos_Aires"},
            () => {
            
            const mensaje ="Pastillaamor! t amo mucho";
            client.sendMessage(`${numero}@c.us`, mensaje).then(() => {
                console.log("Mensaje enviado");
            }).catch((error) => {
                console.error("Error al enviar el mensaje:", error);
            })
        })
    })
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
    

client.initialize();