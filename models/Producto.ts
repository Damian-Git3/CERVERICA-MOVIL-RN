import { Stock } from "./stock";

export interface Producto {
  id: number;
  stock: Stock;
  cantidad: number;
  pack: number;
}