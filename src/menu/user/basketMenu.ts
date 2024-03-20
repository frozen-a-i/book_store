import { Menu } from "@grammyjs/menu";
import { MyContext } from "../../types/context";

export let basketMenu = new Menu<MyContext>("basket-menu")
  .text(`Buyurtma berish 🚀`)
  .back("Ortga🔙");
