import { Menu, MenuRange } from "@grammyjs/menu";
import { MyContext } from "../../types/context";
import { getAllAdmin } from "../../db/admintable";
import { editBookMsg } from "./bookmenuadmin";
import { firstMenuText } from "../../constants";

export let adminMenu = new Menu<MyContext>("admin-menu");
adminMenu
  .dynamic(async () => {
    let allAdmins = await getAllAdmin();
    const range = new MenuRange<MyContext>();
    for (let i of allAdmins) {
      range
        .text(
          `${i.admin_name}`,
          async (ctx) => await ctx.reply(`${ctx.from?.first_name}`)
        )

        .row();
    }
    return range;
  })
  .text(`Yangini qo'shish ➕`, async (ctx) => {
    await ctx.conversation.enter("newAdmin");
  })
  .row()
  .back("Orqaga🔙", async (ctx) => await editBookMsg(ctx, firstMenuText));
