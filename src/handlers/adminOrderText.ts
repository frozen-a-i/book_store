import { MyContext } from "../types/context";

export async function orderText(ctx: MyContext) {
  const text = ctx.session.user.selectedBooks
    .map((element, index) => {
      if (ctx.session.user.currentBookCount[index]) {
        console.log(
          ctx.session.user.currentBookCount[index],
          " ",
          ctx.session.user.orderBookIds[index]
        );
        return `${element} --> ${ctx.session.user.currentBookCount[index]} ta, narxi: ${ctx.session.user.currentBookPrices[index]} so'mdan`;
      }
    })
    .join("\n");
  return `Sizga ${ctx.from?.first_name} tomonidan buyurtma bor!:  
  ${text} Jami: ${ctx.session.user.orderAmount}`;
}

export async function orderInfoText(orders: []) {
  const text = orders
    .map((element: any) => {
      return `${element.book_name} --> ${element.quantity} ta, narxi: ${element.price} so'mdan`;
    })
    .join("\n");
  return `Buyurtma qilingan kitoblar:  ${text}`;
}
