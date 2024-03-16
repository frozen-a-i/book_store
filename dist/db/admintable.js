"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdmin = exports.getAdmin = void 0;
const database_1 = require("../database");
async function getAdmin(id) {
    return await (0, database_1.knex)('admins').select('*').where({ id: id });
}
exports.getAdmin = getAdmin;
async function createAdmin(ctx) {
    var _a, _b;
    return await (0, database_1.knex)('admins').insert({
        id: (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id,
        admin_name: (_b = ctx.from) === null || _b === void 0 ? void 0 : _b.username
    });
}
exports.createAdmin = createAdmin;
