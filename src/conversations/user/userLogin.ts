import { menuCategory } from "../../menu/user/category";
import { MyContext, MyConversation } from "../../types/context";

export async function login(conversation: MyConversation, ctx: MyContext) {
  await ctx.reply(
    ` Assalomu alaykum <b>${ctx.from?.first_name}</b>! 

Online kitob do'konimizga xush kelibsiz! 
Qaysi janrdagi kitoblarni izlayabsiz?`,
    { reply_markup: menuCategory, parse_mode: "HTML" }
  );
}
