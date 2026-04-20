import { Menu } from "@grammyjs/menu";
import { MyContext } from "../../types/context";
import { replyWithTimer } from "../../handlers/replyTimer";
import { editBookMsg } from "../admin/bookmenuadmin";

export let makeOrder = new Menu<MyContext>("make-order")
  .text("−", (ctx) => {
    if (
      ctx.session.user.currentBookCount[
        ctx.session.user.currentBookCountIndex
      ] > 0
    ) {
      ctx.session.user.currentBookCount[
        ctx.session.user.currentBookCountIndex
      ] -= 1;
    }
    ctx.menu.update();
  })
  .text(
    (ctx) =>
      `${
        ctx.session.user.currentBookCount[
          ctx.session.user.currentBookCountIndex
        ]
      }`
  )
  .text("➕", (ctx) => {
    ctx.session.user.currentBookCount[
      ctx.session.user.currentBookCountIndex
    ] += 1;

    ctx.menu.update();
  })
  .row()
  .text(`➕Savatga qo'shish`, (ctx) => {
    if (
      ctx.session.user.currentBookCount[ctx.session.user.currentBookCountIndex]
    ) {
      ctx.session.user.orderAmount +=
        ctx.session.user.currentBookCount[
          ctx.session.user.currentBookCountIndex
        ] * ctx.session.user.currentBookPrice;

      ctx.session.user.orderBookIds.push(ctx.session.user.currentBookId);
      ctx.session.user.currentBookPrices.push(
        ctx.session.user.currentBookPrice
      );
    }

    ctx.session.user.currentBookCountIndex++;
    ctx.session.user.currentBookCount[
      ctx.session.user.currentBookCountIndex
    ] = 0;

    replyWithTimer(ctx, `Savatga qo'shildi!✅`, 500);
  })
  .row()
  .submenu(`Savatcha🛒`, "basket-menu", async (ctx) => {
    return ctx.editMessageText(await savatchatext(ctx));
  })
  .back("Ortga🔙", (ctx) => editBookMsg(ctx, ctx.session.user.currentBookName));

export async function savatchatext(ctx: MyContext) {
  const hasItems = ctx.session.user.selectedBooks.some(
    (_, index) => ctx.session.user.currentBookCount[index] > 0
  );

  if (!hasItems) return `Savatda kitoblar mavjud emas🙁`;

  const text = ctx.session.user.selectedBooks
    .map((element, index) => {
      if (ctx.session.user.currentBookCount[index]) {
        return `  ${element} --> ${ctx.session.user.currentBookCount[index]} ta, narxi: ${ctx.session.user.currentBookPrices[index]}`;
      }
    })
    .filter(Boolean)
    .join("\n  ");

  return `Savatchada:\n\n  ${text}\n\n  Jami: ${ctx.session.user.orderAmount}`;
}
