import { Menu } from "@grammyjs/menu";
import { MyContext } from "../../types/context";

export const orderItemMenu = new Menu<MyContext>("order-item-menu")
  .text(`Status`)
  .back("Orqaga");
