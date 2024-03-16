"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUser = void 0;
const database_1 = require("../database");
async function getUser(tg_id) {
    return await (0, database_1.knex)("user").select("*").where({ tg_id }).first();
}
exports.getUser = getUser;
async function createUser(ctx) {
    var _a, _b, _c;
    return await (0, database_1.knex)("user").insert({
        tg_id: (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id,
        tg_name: (_b = ctx.from) === null || _b === void 0 ? void 0 : _b.first_name,
        tg_username: (_c = ctx.from) === null || _c === void 0 ? void 0 : _c.username
    });
}
exports.createUser = createUser;
