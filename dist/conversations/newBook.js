"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newBook = void 0;
const booksTable_1 = require("../db/booksTable");
async function newBook(conversation, ctx) {
    var _a, _b, _c, _d;
    await ctx.reply(`Kitob nomini kiriting:`);
    const bookname = (_a = (await conversation.wait()).msg) === null || _a === void 0 ? void 0 : _a.text;
    await ctx.reply(`Kitob janrini kiriting:`);
    const category = (_b = (await conversation.wait()).msg) === null || _b === void 0 ? void 0 : _b.text;
    await ctx.reply(`Narhi:`);
    const price = (_c = (await conversation.wait()).msg) === null || _c === void 0 ? void 0 : _c.text;
    await ctx.reply(`Kitob haqida qisqacha ma'lumot`);
    const description = (_d = (await conversation.wait()).msg) === null || _d === void 0 ? void 0 : _d.text;
    try {
        await (0, booksTable_1.createBook)(bookname, price, category, description);
    }
    catch (error) {
        ctx.reply(`Kiritishda xatolik bo'ldi`);
        throw error;
    }
}
exports.newBook = newBook;
