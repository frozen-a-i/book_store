import { createOrderItem, createOrders } from "../../db/ordertable";
import { replyWithTimer } from "../../handlers/replyTimer";
import { MyContext, MyConversation } from "../../types/context";
import { deleteMessage } from "../admin/newBook";

export async function gettingPhone(
  conversation: MyConversation,
  ctx: MyContext
) {
  const message = await ctx.reply(`Telefon raqamingizni kiriting:`, {
    reply_markup: {
      keyboard: [[{ text: "Share My Phone Number", request_contact: true }]],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });
  
  let phone = await conversation.wait();
  const phonenumber = phone.msg?.contact?.phone_number;
  replyWithTimer(
    ctx,
    `Buyurtmangiz uchun rahmat! Siz bilan aloqaga chiqamiz!`,
    1000
  );

  await createOrders(
    ctx.from!.id,
    `Aktiv`,
    new Date(),
    phonenumber!,
    ctx.session.user.orderAmount
  );

  ctx.session.user.currentBookCount.map(async (element, index) => {
    if (element) {
      await createOrderItem(
        ctx.from!.id,
        ctx.session.user.orderBookIds[index],
        ctx.session.user.currentBookCount[index]
      );
    }
  });

  ctx.session.user.currentBookCount = [];
  ctx.session.user.currentBookCountIndex = 0;
  ctx.session.user.selectedBooks = [];
  ctx.session.user.orderAmount = 0;
  ctx.session.user.orderBookIds = [];
  await deleteMessage(ctx, message.message_id);
  phone.deleteMessage();
}
