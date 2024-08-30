export interface Produto{
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  unidadeMedida: "UN" | "KG" | "LT" | "VAZIO";
  quantidade: number;
  mercado: string;
}
