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
  };
  user: {
    currentBookName: string;
    currentCategoryId: number;
    currentBookId: number;
    currentCategoryName: string;
    currentBookCount: number[];
    currentBookCountIndex: number;
    selectedBooks: string[];
    currentBookMsgText:string;
    count: number;
  };
}

export function initial(): SessionData {
  return {
    admin: {
      updateBookText: "",
      currentBookName: "",
      currentBookPrice: 0,
      currentBookDesc: "",
      currentCategoryId: 0,
      menuCatAdminText: "",
    },
    user: {
      currentBookName: "",
      currentBookId: 0,
      currentCategoryId: 0,
      currentCategoryName: "",
      selectedBooks: [],
      currentBookCount: [],
      currentBookCountIndex: 0,
      currentBookMsgText:'',
      count: 0,
    },
  };
}
export type MyContext = Context &
  ConversationFlavor &
  SessionFlavor<SessionData>;
export type MyConversation = Conversation<MyContext>;
