"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conversations_1 = require("@grammyjs/conversations");
const grammy_1 = require("grammy");
const checkImage_1 = require("./menu/checkImage");
const buying_1 = require("./menu/buying");
const category_1 = require("./menu/category");
const actions_1 = require("./menu/actions");
const adminLogin_1 = require("./conversations/adminLogin");
const bookmenu_1 = require("./menu/bookmenu");
const bookmenu2_1 = require("./menu/bookmenu2");
const start_1 = require("./handlers/start");
const bot = new grammy_1.Bot("6829502734:AAE2UYam4W2nTw4M580C3829v_RPEfpneZM");
const chat_id = "1860224846";
// session
bot.use((0, grammy_1.session)({
    initial() {
        return {};
    },
}));
// conversation
bot.use((0, conversations_1.conversations)());
bot.use((0, conversations_1.createConversation)(login));
bot.use((0, conversations_1.createConversation)(adminLogin_1.admins));
bot.use((0, conversations_1.createConversation)(newBook));
// menu
bot.use(checkImage_1.checkImage);
bot.use(buying_1.buyingMenu);
bot.use(category_1.menuCategory);
bot.use(bookmenu2_1.bookMenus);
bot.use(actions_1.actions);
bot.use(bookmenu_1.bookMenu);
bot.use(start_1.startHandler);
bot.start();
function login(conversation, ctx) {
    throw new Error("Function not implemented.");
}
function newBook(conversation, ctx) {
    throw new Error("Function not implemented.");
}
