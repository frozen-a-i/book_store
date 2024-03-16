import { Menu, MenuRange } from "@grammyjs/menu";
import { MyContext } from "../types/context";
import { deleteAdmin, getAllAdmin } from "../db/admintable";
import { editBookMsg } from "./admin/bookmenuadmin";
import { firstMenuText } from "../conversations/adminLogin";

export let allAdmins = getAllAdmin();
export let adminMenu = new Menu<MyContext>("admin-menu");
adminMenu
  .dynamic(async () => {
    const range = new MenuRange<MyContext>();
    for (let i of await allAdmins) {
      range
        .text(`${i.admin_name}`, (ctx) =>
          ctx.reply(`${ctx.from?.first_name}`)
        )
        .text(`O'chirish ❌`, async () => {
          await deleteAdmin(i.id);
        })

        .row();
    }
    return range;
  })
  .text(`Yangini qo'shish ➕`, async (ctx) => {
    await ctx.conversation.enter("newAdmin");
  })
  .row()
  .back("Orqaga🔙", ctx=>editBookMsg(ctx, firstMenuText));
