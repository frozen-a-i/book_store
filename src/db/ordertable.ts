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

export async function currentOrderId(user_id: number) {
  const lastOrder = await knex("orders")
    .select("id")
    .where({ user_id })
    .orderBy("id", "desc")
    .limit(1);
  return lastOrder;
}
export async function createOrderItem(
  user_id: number,
  book_id: number,
  quantity: number
) {
  const orderId = (await currentOrderId(user_id))[0].id;

  return await knex("order_item").insert({
    order_id: orderId,
    book_id,
    quantity,
  });
}
