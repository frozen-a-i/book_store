import { Menu } from "@grammyjs/menu";
import { createOrderItem, createOrders } from "../../db/ordertable";
import { orderText } from "../../handlers/adminOrderText";
import { MyContext, MyConversation } from "../../types/context";
import { deleteMessage } from "../admin/newBook";
import { replyWithTimer } from "../../handlers/replyTimer";
import { sendToAdmin } from "../../handlers/adminOrder";
import { getPhone, getUser } from "../../db/userTable";

export async function gettingPhone(
  conversation: MyConversation,
  ctx: MyContext
) {
  const userObj = await getUser(ctx.from!.id);
  let phonenumber;
  if (!userObj) {
    const message = await ctx.reply(`📞Telefon raqamingizni kiriting:`, {
      reply_markup: {
        keyboard: [
          [{ text: "📞Telefon raqamni yuborish", request_contact: true }],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });

    let phone = await conversation.wait();
    phonenumber = phone.msg?.contact?.phone_number;
    await deleteMessage(ctx, message.message_id);
    // await ctx.conversation.enter("login");
    phone.deleteMessage();
  } else phonenumber = (await getPhone(ctx.from?.id)).phone_number;

  replyWithTimer(
    ctx,
    `Buyurtmangiz uchun rahmat, siz bilan aloqaga chiqamiz!☺️`,
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

  const text = (await orderText(ctx)) + ` Telefon raqami: ${phonenumber}`;

  await sendToAdmin(ctx, text);

  ctx.session.user.currentBookCount = [];
  ctx.session.user.currentBookCountIndex = 0;
  ctx.session.user.selectedBooks = [];
  ctx.session.user.orderAmount = 0;
  ctx.session.user.orderBookIds = [];

  return true;
}
