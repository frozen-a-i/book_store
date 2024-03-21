import { Menu } from "@grammyjs/menu";
import { MyContext } from "../../types/context";
import { changeStatus } from "../../db/ordertable";
import { replyWithTimer } from "../../handlers/replyTimer";
import { editBookMsg } from "./bookmenuadmin";

export const orderItemMenu = new Menu<MyContext>("order-item-menu")
  .text((ctx) => `${ctx.session.admin.currentOrderStatus}`)
  .text(`Buyurtmani yuborish!`, async (ctx) => {
    if (ctx.session.admin.currentOrderStatus == "Aktiv") {
      await changeStatus(ctx.session.admin.currentOrderId);
      ctx.session.admin.currentOrderStatus = "Passiv";
      ctx.menu.update();
      replyWithTimer(ctx, `Buyurtma passiv holatga o'tkazildi!✅`, 1000);
    } else replyWithTimer(ctx, `Buyurtma yuborilgan!!!`, 1000);
  })
  .back("Orqaga", (ctx) => editBookMsg(ctx, `Buyurtmalar`));
