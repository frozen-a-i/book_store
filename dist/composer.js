"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composer = void 0;
const grammy_1 = require("grammy");
const controller_1 = require("./controller");
exports.composer = new grammy_1.Composer();
exports.composer.command("start", async (ctx) => {
    var _a, _b;
    const userObj = await (0, controller_1.getUser)((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id);
    const adminObj = await (0, controller_1.getAdmin)((_b = ctx.from) === null || _b === void 0 ? void 0 : _b.id);
    if (adminObj)
        await ctx.conversation.enter("admins");
    else {
        if (!userObj)
            (0, controller_1.createUser)(ctx);
        await ctx.conversation.enter("login");
    }
});
