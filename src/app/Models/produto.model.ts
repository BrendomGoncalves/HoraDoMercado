import {Mercado} from "./mercado.model";

export interface Produto {
  id?: number;
  nome: string;
  descricao: string;
  unidadeMedida: string;
  quantidade: number;
  mercado: Mercado[];
}
