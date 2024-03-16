import { Menu } from "@grammyjs/menu";
import { editBookMsg } from "./bookmenuadmin";
import { MyContext } from "../../types/context";

export let actionMenuText1 = "Janrlar";
export let actionMenuText2="Adminlar";
export let actionMenuText3="Buyurtmalar";
export const actions = new Menu<MyContext>("action")

  .submenu("Janrlar", "menu-category-admin", async (ctx) => {
   
    await editBookMsg(ctx, actionMenuText1);
  })

  .submenu("Adminlar", "admin-menu", async (ctx) => {
   
    await editBookMsg(ctx, actionMenuText2);
  })
  .submenu("Buyurtmalar", "orders-menu", async (ctx) => {
   
    await editBookMsg(ctx, actionMenuText3);
  })
