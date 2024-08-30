import {Mercado} from "./mercado.model";

export interface Produto {
  id?: number;
  nome: string;
  descricao: string;
  unidadeMedida: "UN" | "KG" | "LT" | "VAZIO";
  quantidade: number;
  mercado: Mercado[];
}
