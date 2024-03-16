import { createAdmin } from "../db/admintable";
import { handleInsertError } from "../handlers/dberrorhandler";
import { replyWithTimer } from "../handlers/replyTimer";
import { MyContext, MyConversation } from "../types/context";
import { deleteMessage } from "./newBook";

export async function newAdmin(conversation: MyConversation, ctx: MyContext) {
  let messageIds: number[] = [];
  const adminUsername = await ctx.reply(`Admin USERNAMEini kiriting:`);

  let message = await conversation.wait();
  let username = message.msg?.text;

  messageIds.push(adminUsername.message_id);
  await deleteMessage(ctx, messageIds.shift()!);
  if (username) {
    try {
      if (username[0] == "@") username = username.slice(1);
      await createAdmin(username);
      await replyWithTimer(ctx, "Yangi admin muvaffaqiyatli yaratildi😀", 1000);
    } catch (error: any) {
      await handleInsertError(ctx, error);
    }
    message.deleteMessage();
  }
}
