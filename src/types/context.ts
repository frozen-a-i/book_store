import { Conversation, ConversationFlavor } from "@grammyjs/conversations";
import { Context, SessionFlavor } from "grammy";

interface SessionData {
  admin: {
    updateBookText: string;
    currentBookName: string;
    currentBookPrice: number;
    currentBookDesc: string;
    currentCategoryId: number;
    menuCatAdminText: string;
    currentCategoryName: string;
    currentBookCategory: string;
  };
  user: {
    currentBookName: string;
    currentCategoryId: number;
    currentBookId: number;
    currentCategoryName: string;
    currentBookCount: number[];
    currentBookCountIndex: number;
    selectedBooks: string[];
    currentBookMsgText: string;
    currentBookPrice: number;
    currentBookPrices: number[];
    orderBookIds: number[];
    count: number;
    orderAmount: number;
  };
}

export function initial(): SessionData {
  return {
    admin: {
      updateBookText: "",
      currentBookName: "",
      currentCategoryName: "",
      currentBookPrice: 0,
      currentBookDesc: "",
      currentCategoryId: 0,
      menuCatAdminText: "",
      currentBookCategory: "",
    },
    user: {
      currentBookName: "",
      currentBookId: 0,
      currentBookPrices: [],
      currentCategoryId: 0,
      currentCategoryName: "",
      selectedBooks: [],
      currentBookCount: [],
      orderBookIds: [],
      currentBookCountIndex: 0,
      currentBookMsgText: "",
      currentBookPrice: 0,
      count: 0,
      orderAmount: 0,
    },
  };
}
export type MyContext = Context &
  ConversationFlavor &
  SessionFlavor<SessionData>;
export type MyConversation = Conversation<MyContext>;
