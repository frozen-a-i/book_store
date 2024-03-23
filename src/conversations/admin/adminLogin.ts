import { updateAdminId } from "../../db/admintable";
import { actions } from "../../menu/admin/actions";
import { MyContext } from "../../types/context";

export async function admins(ctx: MyContext) {
  await updateAdminId(ctx.from?.id, ctx.from?.username);

  await ctx.reply(
    `Assalomu alaykum<b> ${ctx.from?.first_name}</b>! Quyidagilardan birini tanlang!☺️`,
    {
      reply_markup: actions,
      parse_mode: "HTML",
    }
  );
}
