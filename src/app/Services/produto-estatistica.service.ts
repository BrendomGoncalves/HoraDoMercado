import {Injectable} from '@angular/core';
import {ProdutoService} from "./produto.service";

@Injectable({
  providedIn: 'root'
})
export class ProdutoEstatisticaService {

  constructor(private produtoService: ProdutoService) {
  }

  async quantidadeProdutos(): Promise<number> {
    return this.produtoService.getQuantidade();
  }

  async quantidadeProdutosMercado(): Promise<[string, number][]> {
    const produtos = await this.produtoService.obterProdutos();
    const mercadoQuantidadeMap: { [key: string]: number } = {};

    produtos.forEach(produto => {
      produto.mercado.forEach(mercado => {
        if (mercadoQuantidadeMap[mercado.nome]) {
          mercadoQuantidadeMap[mercado.nome]++;
        } else {
          mercadoQuantidadeMap[mercado.nome] = 1;
        }
      });
    });

    return Object.entries(mercadoQuantidadeMap);
  }

  async produtosMaiorQuantidade(): Promise<[string, number][]> {
    const produtos = await this.produtoService.obterProdutos();
    const produtosQuantidadeMap: { [key: string]: number } = {};

    produtos.forEach(produto => {
      if (produtosQuantidadeMap[produto.nome]) {
        produtosQuantidadeMap[produto.nome] += produto.quantidade;
      } else {
        produtosQuantidadeMap[produto.nome] = produto.quantidade;
      }
    });

    return Object.entries(produtosQuantidadeMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12);
  }
}
