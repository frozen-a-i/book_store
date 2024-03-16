"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookMenu = void 0;
const menu_1 = require("@grammyjs/menu");
const category_1 = require("./category");
const buying_1 = require("./buying");
exports.bookMenu = new menu_1.Menu('book');
exports.bookMenu.dynamic(async () => {
    const range = new menu_1.MenuRange();
    for (let i of await category_1.books) {
        range.text(`${i.book_name}`, (ctx) => {
            ctx.reply(`Kitob nomi:${i.book_name}, Narhi: ${i.price}, Janri: ${i.category}, Qisqacha ma'lumot: ${i.description} `, { reply_markup: buying_1.buyingMenu });
        })
            .row();
    }
    return range;
})
    .text("Cancel", (ctx) => ctx.deleteMessage());
