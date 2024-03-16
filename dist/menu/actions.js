"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
const menu_1 = require("@grammyjs/menu");
const bookmenu2_1 = require("./bookmenu2");
exports.actions = new menu_1.Menu('action')
    .text('Kitoblar', ctx => ctx.reply(`Kitoblar bo'limi`, { reply_markup: bookmenu2_1.bookMenus }))
    .text('Adminlar', ctx => ctx.reply(''))
    .text('Buyurtmalar', ctx => ctx.reply(''));
