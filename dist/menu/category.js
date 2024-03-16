"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuCategory = exports.books = void 0;
const menu_1 = require("@grammyjs/menu");
const bookmenu_1 = require("./bookmenu");
const categoriesTable_1 = require("../db/categoriesTable");
const booksTable_1 = require("../db/booksTable");
exports.menuCategory = new menu_1.Menu('cat');
const categories = (0, categoriesTable_1.getAllCategories)();
exports.menuCategory.dynamic(async () => {
    const range = new menu_1.MenuRange();
    for (let i of await categories) {
        range.text(`${i.category_name}`, async function (ctx) {
            exports.books = await (0, booksTable_1.getBook)(i.category_name);
            ctx.deleteMessage();
            ctx.reply(`${i.category_name} janridagi asarlar: `, { reply_markup: bookmenu_1.bookMenu });
        })
            .row();
    }
    return range;
});
