import { updateAdminId } from "../db/admintable";
import { actions } from "../menu/admin/actions";
import { MyContext } from "../types/context";

export let firstMenuText: string = "Quyidagilardan birini tanlang!";
export async function admins(ctx: MyContext) {
  await updateAdminId(ctx.from?.id, ctx.from?.username);

  await ctx.reply(`Assalomu alaykum ${ctx.from?.first_name}! Quyidagilardan birini tanlang?`, {
    reply_markup: actions,
  });
}
