"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBook = exports.deleteBook = exports.getAllBooks = exports.getBook = void 0;
const database_1 = require("../database");
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
