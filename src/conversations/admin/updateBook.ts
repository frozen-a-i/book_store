import { updatingBook } from "../../db/booksTable";
import { replyWithTimer } from "../../handlers/replyTimer";

import { MyContext, MyConversation } from "../../types/context";
import { deleteMessage } from "./newBook";

export async function updateBookPrice(
  conversation: MyConversation,
  ctx: MyContext
) {
  const message = await ctx.reply(`Yangi narxni kiriting`);
  let price = await conversation.wait();
  const pricetext = price.msg?.text;

  await deleteMessage(ctx, message.message_id);
  try {
    ctx.session.admin.currentBookPrice = Number(pricetext);
    await updatingBook(ctx.session.admin.currentBookName, pricetext);
    await replyWithTimer(ctx, `Kitobga yangi narx belgilandi!☺️`, 1000);
  } catch (error) {
    ctx.reply(`Kiritishda xatolik bo'ldi`);
    throw error;
  }
  price.deleteMessage();
}

// export async function updateBookCategory(
//   conversation: MyConversation,
//   ctx: MyContext
// ) {
//   await ctx.reply(`Yangi janrni kiriting`);
//   const category = (await conversation.wait()).msg?.text;

//   try {
//     await updatingBook(currentBookName, undefined, undefined, category);

//   } catch (error) {
//     ctx.reply(`Kiritishda xatolik bo'ldi`);
//     throw error;
//   }
// }

export async function updateBookDescription(
  conversation: MyConversation,
  ctx: MyContext
) {
  const message = await ctx.reply(`Kitob haqida ma'lumot kiriting`);

  let description = await conversation.wait();
  const descriptiontext = description.msg?.text;

  await deleteMessage(ctx, message.message_id);

  try {
    ctx.session.admin.currentBookDesc = descriptiontext!;
    await updatingBook(
      ctx.session.admin.currentBookName,
      undefined,
      descriptiontext
    );
    await replyWithTimer(
      ctx,
      `Kitob haqidagi ma'lumotlar muvaffaqiyatli yangilandi!☺️`,
      1000
    );
    
  } catch (error) {
    ctx.reply(`Kiritishda xatolik bo'ldi`);
    throw error;
  }
  description.deleteMessage();
}
