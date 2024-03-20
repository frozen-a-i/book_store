import { knex } from "../database";

export async function createOrders(
  user_id: number,
  status: string,
  order_date: Date,
  phone_number: string,
  total_amount: number
) {
  return await knex("orders").insert({
    user_id,
    status,
    order_date,
    phone_number,
    total_amount,
  });
}

export async function createOrderItem(
  order_id: number,
  book_id: number,
  quantity: number
) {
  return await knex("order_item").insert({
    order_id,
    book_id,
    quantity,
  });
}
