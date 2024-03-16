"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allBooks = exports.bookMenus = void 0;
const menu_1 = require("@grammyjs/menu");
const booksTable_1 = require("../db/booksTable");
exports.bookMenus = new menu_1.Menu("books");
exports.allBooks = (0, booksTable_1.getAllBooks)();
exports.bookMenus
    .dynamic(async () => {
    const range = new menu_1.MenuRange();
    for (let i of await exports.allBooks) {
        range
            .text(`${i.book_name}`, (ctx) => {
            ctx.reply(`Kitob nomi:${i.book_name}, Narhi: ${i.price}, Janri: ${i.category}, Qisqacha ma'lumot: ${i.description} `);
        })
            .text("O'chirish", (ctx) => {
            ctx.reply(`O'chirildi`);
            (0, booksTable_1.deleteBook)(`${i.book_name}`);
            ctx.deleteMessage();
        })
            .row();
    }
    return range;
})
    .text("Yangini qo'shish", async (ctx) => {
    await ctx.conversation.enter("newBook");
});
