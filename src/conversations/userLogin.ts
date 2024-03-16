import { menuCategory } from "../menu/category";
import { MyContext, MyConversation } from "../types/context";

export const firstUserText="Online kitob do'konimizga xush kelibsiz! Qaysi janrdagi kitoblarni izlayabsiz?"
export async function login(conversation: MyConversation, ctx: MyContext) {



    await ctx.reply(`Assalomu alaykum ${ctx.from?.first_name}! Online kitob do'konimizga xush kelibsiz! Qaysi janrdagi kitoblarni izlayabsiz?`,
        { reply_markup: menuCategory },

    );
    // const { message } = await conversation.wait();
    // await ctx.reply(`Welcome to the chat, ${message?.text}!`);

}