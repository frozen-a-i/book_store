import { createBook } from "../db/booksTable";
import { handleInsertError } from "../handlers/dberrorhandler";
import { MyContext, MyConversation } from "../types/context";
import { currentCategoryId } from "../menu/admin/categoryAdmin";
import { replyWithTimer } from "../handlers/replyTimer";

// Function to delete a message
export async function deleteMessage(ctx: MyContext, messageId: number) {
  try {
    await ctx.api.deleteMessage(ctx.chat!.id, messageId);
  } catch (error) {
    console.error("Error deleting message:", error);
  }
}

//////newbook function to create

export async function newBook(conversation: MyConversation, ctx: MyContext) {
  let messageIds: number[] = [];
  const booknameMsg = await ctx.reply(`Kitob nomini kiriting:`);

  let message = await conversation.wait();
  const bookname = message.msg?.text;
  messageIds.push(booknameMsg.message_id);
  await deleteMessage(ctx, messageIds.shift()!);
  message.deleteMessage();

  const priceMsg = await ctx.reply(`Narhi:`);
  message = await conversation.wait();
  const price = message.msg?.text;
  message.deleteMessage();
  messageIds.push(priceMsg.message_id);
  deleteMessage(ctx, messageIds.shift()!);

  const descriptionMsg = await ctx.reply(`Kitob haqida qisqacha ma'lumot`);
  message = await conversation.wait();
  const description = message.msg?.text;
  message.deleteMessage();
  messageIds.push(descriptionMsg.message_id);
  deleteMessage(ctx, messageIds.shift()!);

  try {
    await createBook(bookname, price, currentCategoryId, description);
    await replyWithTimer(ctx, "Yangi kitob muvaffaqiyatli yaratildi😀", 1000);
  } catch (error: any) {
    await handleInsertError(ctx, error);
  }
}
