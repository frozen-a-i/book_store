import { Menu, MenuRange } from "@grammyjs/menu";
import { MyContext } from "../../types/context";
import { getOrderItems, getPassiveOrders } from "../../db/ordertable";
import { orderInfoText } from "../../handlers/adminOrderText";
import { editBookMsg } from "./bookmenuadmin";

export const passiveOrdersMenu = new Menu<MyContext>("passive-orders");

passiveOrdersMenu
  .dynamic(async () => {
    const range = new MenuRange<MyContext>();
    const orders = await getPassiveOrders();
    let cnt = 1;
    console.log(orders);
    for (let i of orders) {
      range
        .submenu(
          `✅ ${cnt++}. ${
            i.tg_name
          } ------------------ ${i.order_date.toLocaleDateString()} `,
          "order-item-menu",
          async (ctx) => {
            const orderInfo = await getOrderItems(i.id);
            ctx.session.admin.currentOrderStatus = i.status;
            ctx.session.admin.currentOrderId = i.id;
            const text = await orderInfoText(orderInfo);
            editBookMsg(
              ctx,
              `<b>Buyurtma haqida to'liq ma'lumot!</b>
              
        ${text} 

        Jami: <b>${i.total_amount}</b>
               
        📞: <b>${i.phone_number}</b> `
            );
          }
        )

        .row();
    }
    return range;
  })
  .back("Orqaga 🔙", (ctx) => editBookMsg(ctx, `<b>📬Buyurtmalar</b>`));
