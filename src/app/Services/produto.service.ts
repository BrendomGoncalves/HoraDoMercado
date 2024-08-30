import {Injectable} from '@angular/core';
import {AppDB} from "../appdb";
import {Produto} from "../Models/produto.model";

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  constructor(private db: AppDB) {}

  async adicionarProduto(produto: Produto): Promise<number> {
    return this.db.produtos.add(produto);
  }

  async obterProdutos(): Promise<Produto[]> {
    return this.db.produtos.toArray();
  }

  async obterProdutoPorId(id: number): Promise<Produto | undefined> {
    return this.db.produtos.get(id);
  }

  async atualizarProduto(produto: Produto): Promise<number> {
    return this.db.produtos.update(produto.id, produto);
  }

  async removerProduto(id: number): Promise<void> {
    return this.db.produtos.delete(id);
  }

  async removerProdutos(ids: number[]): Promise<void>{
    return this.db.produtos.bulkDelete(ids);
  }
}

