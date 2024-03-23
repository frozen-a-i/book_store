import { conversations, createConversation } from "@grammyjs/conversations";
import { Bot, session } from "grammy";
import { MyContext } from "./types/context";

import { menuCategory } from "./menu/user/category";

import { actions } from "./menu/admin/actions";

import { bookMenu } from "./menu/user/bookmenu";
import { bookMenuAdmin } from "./menu/admin/bookmenuadmin";
import { startHandler } from "./handlers/start";
import { login } from "./conversations/user/userLogin";
import { newBook } from "./conversations/admin/newBook";
import { bookActions } from "./menu/admin/bookActionsAdmin";
import {
  updateBookDescription,
  updateBookPrice,
} from "./conversations/admin/updateBook";
import { updateBook } from "./menu/admin/updateBook";
import { dbErrorHandler } from "./handlers/dberrorhandler";
import type { ParseModeFlavor } from "@grammyjs/parse-mode";
import { newAdmin } from "./conversations/admin/newAdmin";
import { adminMenu } from "./menu/admin/adminsMenu";
import { menuCategoryAdmin } from "./menu/admin/categoryAdmin";
import { categoryUpdate } from "./menu/admin/updateCategoryOfBooks";
import { newCategory } from "./conversations/admin/newCategory";
import { initial } from "./types/context";
import { config } from "dotenv";
import { menuOrdersAdmin } from "./menu/admin/ordersMenu";
import { basketMenu } from "./menu/user/basketMenu";
import { makeOrder } from "./menu/user/makingOrder";
import { gettingPhone } from "./conversations/user/userOrder";
import { orderActionMenu } from "./menu/admin/orderActions";
import { orderItemMenu } from "./menu/admin/orderItemMenu";
import { activeOrdersMenu } from "./menu/admin/activeOrdersMenu";
import { passiveOrdersMenu } from "./menu/admin/passiveOrdersMenu";

config();

const bot = new Bot<ParseModeFlavor<MyContext>>(process.env.BOT_TOKEN || "");

// session
bot.use(
  session({
    initial,
  })
);

// conversation
bot.use(conversations());
bot.use(createConversation(login));
bot.use(createConversation(newAdmin));
bot.use(createConversation(newBook));
bot.use(createConversation(newCategory));

bot.use(createConversation(updateBookPrice));

bot.use(createConversation(gettingPhone));

bot.use(createConversation(updateBookDescription));
// menu

bot.use(actions);
bot.use(menuCategory);
actions.register(adminMenu);
actions.register(menuCategoryAdmin);
actions.register(orderActionMenu);
orderActionMenu.register(menuOrdersAdmin);
orderActionMenu.register(activeOrdersMenu);
orderActionMenu.register(passiveOrdersMenu);

orderActionMenu.register(orderItemMenu);
menuCategoryAdmin.register(bookMenuAdmin);
bookMenuAdmin.register(bookActions);
bookActions.register(updateBook);
updateBook.register(categoryUpdate);

menuCategory.register(bookMenu);
menuCategory.register(basketMenu);
bookMenu.register(makeOrder);

bot.use(dbErrorHandler);
bot.use(bookMenu);

bot.use(startHandler);

try {
  bot.start();
} catch (error) {
  console.log(error);
}
