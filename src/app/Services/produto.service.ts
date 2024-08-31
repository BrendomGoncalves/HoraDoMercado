import {Injectable} from '@angular/core';
import {Produto} from "../Models/produto.model";
import {BehaviorSubject} from "rxjs";
import Dexie from "dexie";

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private db: Dexie;
  private table: Dexie.Table<Produto, number>;

  private produtosSubject = new BehaviorSubject<Produto[]>([]);
  produtos$ = this.produtosSubject.asObservable();

  constructor() {
    this.db = new Dexie('ProdutoDB');
    this.db.version(1).stores({
      produtos: '++id, nome, descricao, unidadeMedida, quantidade, mercado',
    });
    this.table = this.db.table('produtos');

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

  async adicionarProduto(produto: Produto) {
    this.table.add(produto);
    await this.carregarProdutos();
  }

  async obterProdutos() {
    return this.table.orderBy('nome').toArray();
  }

  async getProdutoById(id: number) {
    return this.table.get(id);
  }

  async atualizarProduto(id: number | undefined, changes: Partial<Produto>) {
    if (id != null) {
      this.table.update(id, changes);
      await this.carregarProdutos();
    }
  }

  async removerProduto(id: number | undefined) {
    if (id != null) {
      this.table.delete(id);
      await this.carregarProdutos();
    }
  }

  async removerProdutos(ids: number[]) {
    this.table.bulkDelete(ids);
    await this.carregarProdutos();
  }
}

