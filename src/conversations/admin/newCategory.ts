import { createCategory } from "../../db/categoriesTable";
import { handleInsertError } from "../../handlers/dberrorhandler";
import { replyWithTimer } from "../../handlers/replyTimer";
import { MyContext, MyConversation } from "../../types/context";
import { deleteMessage } from "./newBook";

export async function newCategory(
  conversation: MyConversation,
  ctx: MyContext
) {
  const message = await ctx.reply(`<i>Yangi janrni kiriting:</i>`,{ parse_mode: "HTML"});

  let category = await conversation.wait();
  const categoryname = category.msg?.text;

  await deleteMessage(ctx, message.message_id);
  if (categoryname) {
    try {
      await createCategory(categoryname);
      await replyWithTimer(ctx, "Yangi janr muvaffaqiyatli yaratildi😀", 1000);
    } catch (error: any) {
      await handleInsertError(ctx, error);
    }
  }
  category.deleteMessage();
}
