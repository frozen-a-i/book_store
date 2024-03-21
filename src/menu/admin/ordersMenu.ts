import { Menu, MenuRange } from "@grammyjs/menu";
import { MyContext } from "../../types/context";
import { getAllOrders, getOrderItems } from "../../db/ordertable";
import { editBookMsg } from "../../menu/admin/bookmenuadmin";
import { orderInfoText } from "../../handlers/adminOrderText";
export let menuOrdersAdmin = new Menu<MyContext>("menu-orders-admin");

menuOrdersAdmin
  .dynamic(async () => {
    const range = new MenuRange<MyContext>();
    const orders = await getAllOrders();
    let cnt = 1;
    for (let i of orders) {
      range
        .submenu(
          `${i.status !== "Aktiv" ? "✅" : "📩"}${cnt++}. ${
            i.tg_name
          } ------------------ ${i.order_date.toLocaleDateString()}`,
          "order-item-menu",
          async (ctx) => {
            const orderInfo = await getOrderItems(i.id);
            ctx.session.admin.currentOrderStatus = i.status;
            ctx.session.admin.currentOrderId = i.id;
            const text = await orderInfoText(orderInfo);
            editBookMsg(
              ctx,
              `Buyurtma haqida to'liq ma'lumot! ${text} Jami: ${i.total_amount} 📞:${i.phone_number}`
            );
          }
        )

        // .text(`Bajarish`, async (ctx) => {
        //   if (ctx.session.admin.currentOrderStatus == "Aktiv") {
        //     ctx.session.admin.currentOrderStatus = `✅`;
        //     await changeStatus(i.id);
        //     ctx.menu.update();
        //   }
        // })
        .row();
    }
    return range;
  })
  .back("Orqaga 🔙");
