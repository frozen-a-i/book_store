"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyingMenu = void 0;
const menu_1 = require("@grammyjs/menu");
const constants_1 = require("../constants");
const checkImage_1 = require("./checkImage");
exports.buyingMenu = new menu_1.Menu("buy-menu").text("Sotib olish", (ctx) => {
    ctx.deleteMessage();
    ctx.reply(`To'lovni ushbu karta raqamiga yuboring! ${constants_1.CARD_NUMBER}`, {
        reply_markup: checkImage_1.checkImage,
    });
});
