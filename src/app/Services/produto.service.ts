import {Injectable} from '@angular/core';
import {AppDB} from "../appdb";
import {Produto} from "../Models/produto.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private produtosSubject = new BehaviorSubject<Produto[]>([]);
  produtos$ = this.produtosSubject.asObservable();

  constructor(private db: AppDB) {
    this.carregarProdutos().then(() => {
      console.log('Produtos carregados...')
    }).catch((err) => {
      console.error(err)
    });
  }

  private async carregarProdutos() {
    const produtos = await this.obterProdutos();
    this.produtosSubject.next(produtos);
  }

  async adicionarProduto(produto: Produto): Promise<number> {
    const id = await this.db.produtos.add(produto);
    await this.carregarProdutos();
    return id;
  }

  async obterProdutos(): Promise<Produto[]> {
    return this.db.produtos.toArray();
  }

  async obterProdutoPorId(id: number): Promise<Produto | undefined> {
    return this.db.produtos.get(id);
  }

  async atualizarProduto(produto: Produto): Promise<number> {
    const updated = await this.db.produtos.update(produto.id, {
      nome: produto.nome,
      descricao: produto.descricao,
      unidadeMedida: produto.unidadeMedida,
      quantidade: produto.quantidade,
      mercado: produto.mercado,
    });
    await this.carregarProdutos();
    return updated;
  }

  async removerProduto(id: number): Promise<void> {
    await this.db.produtos.delete(id);
    await this.carregarProdutos();
  }

  async removerProdutos(ids: number[]): Promise<void> {
    await this.db.produtos.bulkDelete(ids);
    await this.carregarProdutos();
  }
}

