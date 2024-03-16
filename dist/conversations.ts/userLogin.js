"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../menu/category");
async function login(conversation, ctx) {
    var _a;
    await ctx.reply(`Assalomu alaykum ${(_a = ctx.from) === null || _a === void 0 ? void 0 : _a.first_name}! Online kitob do'konimizga xush kelibsiz! Qaysi janrdagi kitoblarni izlayabsiz?`, { reply_markup: category_1.menuCategory });
    // const { message } = await conversation.wait();
    // await ctx.reply(`Welcome to the chat, ${message?.text}!`);
}
