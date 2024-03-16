"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrder = exports.createOrders = void 0;
const database_1 = require("../database");
async function createOrders(userID, bookname) {
    return await (0, database_1.knex)('orders').insert({
        userID: userID,
        book_name: bookname
    });
}
exports.createOrders = createOrders;
async function getOrder(id) {
    return await (0, database_1.knex)('orders').select('book_name').where({ id });
}
exports.getOrder = getOrder;
