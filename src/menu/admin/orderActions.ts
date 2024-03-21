import { Menu } from "@grammyjs/menu";
import { MyContext } from "../../types/context";


export const orderActionMenu=new Menu<MyContext>('order-action-menu')
.text(`Aktiv buyurtmalar`, )
.text('Yuborilgan buyurtmalar')
.submenu('Hammasi', 'menu-orders-admin')
.back('🔙')