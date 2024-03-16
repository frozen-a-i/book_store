"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrder = exports.createOrders = exports.createAdmin = exports.getAdmin = exports.createBook = exports.deleteBook = exports.getAllBooks = exports.getBook = exports.createCategory = exports.getCategory = exports.getAllCategories = exports.createUser = exports.getUser = void 0;
const database_1 = require("./database");
////user 
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
///categories
async function getAllCategories() {
    return await (0, database_1.knex)('category').select('id', 'category_name');
}
exports.getAllCategories = getAllCategories;
async function getCategory(id) {
    return await (0, database_1.knex)("category").select("*").where({ id });
}
exports.getCategory = getCategory;
async function createCategory(name) {
    return await (0, database_1.knex)('category').insert({
        category_name: name
    });
}
exports.createCategory = createCategory;
///// books
async function getBook(category) {
    return await (0, database_1.knex)("book").select('*').where({ category });
}
exports.getBook = getBook;
async function getAllBooks() {
    return await (0, database_1.knex)("book").select('*');
}
exports.getAllBooks = getAllBooks;
async function deleteBook(book_name) {
    return await (0, database_1.knex)("book").where({ book_name }).del();
}
exports.deleteBook = deleteBook;
async function createBook(bookname, price, category, description) {
    return await (0, database_1.knex)('book').insert({
        book_name: bookname,
        price: price,
        category: category,
        description: description
    });
}
exports.createBook = createBook;
//// admin 
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
///orders 
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
