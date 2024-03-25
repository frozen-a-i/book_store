import { Menu } from "@grammyjs/menu";
import { editBookMsg } from "./bookmenuadmin";
import { MyContext } from "../../types/context";
import {
  actionMenuText1,
  actionMenuText2,
  actionMenuText3,
} from "../../constants";

export const actions = new Menu<MyContext>("action")

  .submenu("📝Janrlar", "menu-category-admin", async (ctx) => {
    await editBookMsg(ctx, actionMenuText1);
  })

  .submenu("🔑Adminlar", "admin-menu", async (ctx) => {
    await editBookMsg(ctx, actionMenuText2);
  })
  .submenu("📬Buyurtmalar", "order-action-menu", async (ctx) => {
    await editBookMsg(ctx, actionMenuText3);
  });
