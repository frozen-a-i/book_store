import { Menu } from "@grammyjs/menu";
import { MyContext } from "../../types/context";
import { editBookMsg } from "./bookmenuadmin";
import { firstMenuText } from "../../constants";

export const orderActionMenu = new Menu<MyContext>("order-action-menu")
  .submenu(`📩 Aktiv buyurtmalar`, "active-orders", (ctx) => {
    editBookMsg(ctx, `❗️Yuborilishi kerak bo'lgan buyurtmalar:`);
  })
  .row()
  .submenu("📤 Yuborilgan buyurtmalar", "passive-orders", (ctx) => {
    editBookMsg(ctx, `Yuborilgan buyurtmalar:`);
  })
  .row()
  .submenu("Hammasi", "menu-orders-admin")
  .back("🔙", (ctx) => editBookMsg(ctx, firstMenuText));
