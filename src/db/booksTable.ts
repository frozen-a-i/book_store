import { knex } from "../database";


export async function getBooksOnThisCategory(ids: number) {
  return await knex("book").select("*").where({ category_id: ids });
}

export async function getAllBooks() {
  return await knex("book").select("*");
}

export async function deleteBook(book_name: string) {
  return await knex("book").where({ book_name }).del();
}

export async function createBook(
  bookname: string | undefined,
  price: string | undefined,
  category_id: number | undefined,
  description: string | undefined
) {
  return await knex("book").insert({
    book_name: bookname,
    price,
    category_id,
    description,
  });
}
////-----------updating book parameters-----------//////

export async function updatingBook(
  bookname: string | undefined,
  price?: string | undefined,
  description?: string | undefined,
  category_id?: number | undefined
) {
  if (price) {
    return await knex("book").where({ book_name: bookname }).update({
      price,
    });
  }
  if (category_id) {
    return await knex("book").where({ book_name: bookname }).update({
      category_id,
    });
  }
  if (description) {
    return await knex("book").where({ book_name: bookname }).update({
      description,
    });
  }
}
