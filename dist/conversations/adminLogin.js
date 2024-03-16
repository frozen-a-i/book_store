"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.admins = void 0;
const actions_1 = require("../menu/actions");
async function admins(conversation, ctx) {
    var _a;
    await ctx.reply(`Assalomu alaykum ${(_a = ctx.from) === null || _a === void 0 ? void 0 : _a.first_name}! Quyidagilardan birini tanlang?`, { reply_markup: actions_1.actions });
}
exports.admins = admins;
