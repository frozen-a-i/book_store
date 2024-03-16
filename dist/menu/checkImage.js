"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkImage = void 0;
const menu_1 = require("@grammyjs/menu");
exports.checkImage = new menu_1.Menu('check').text(`To'lov haqidagi chekni yuborish`, (ctx) => {
    var _a;
    ctx.deleteMessage();
    const file = (_a = ctx.msg) === null || _a === void 0 ? void 0 : _a.photo;
});
