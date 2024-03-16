import { knex } from "../database";

export async function createOrders(
  user_id: number,
  book_id: number,
  status: string,
  order_date: Date,
  quantity: number,
  phone_number: string
) {
  return await knex("orders").insert({
    user_id,
    book_id,
    status,
    order_date,
    quantity,
    phone_number,
  });
}

export async function getorder(id: number) {
  return await knex("orders").select("book_name").where({ id });
}
