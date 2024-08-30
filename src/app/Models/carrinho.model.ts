import {Produto} from "./produto.model";

export interface Carrinho {
  id: number;
  diaCompra: Date;
  mercado: string;
  precoTotal: number;
  produtos: Produto[];
}
