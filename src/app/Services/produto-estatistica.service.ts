import { Injectable } from '@angular/core';
import {ProdutoService} from "./produto.service";
import {Produto} from "../Models/produto.model";

@Injectable({
  providedIn: 'root'
})
export class ProdutoEstatisticaService {
  produtos: Array<Produto> = [];

  constructor(private produtoService: ProdutoService) {
    this.capturarProdutos().then();
  }

  private async capturarProdutos() {
    this.produtos = await this.produtoService.obterProdutos();
  }

  async quantidaadeProdutos(): Promise<number> {
    return this.produtos.length;
  }
}
