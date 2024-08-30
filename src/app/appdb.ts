import { Injectable } from '@angular/core';
import Dexie, {Table} from "dexie";
import {Produto} from "./Models/produto.model";

@Injectable({
  providedIn: 'root',
})
export class AppDB extends Dexie {
  produtos!: Table<Produto, number>;

  constructor() {
    super('AppDB');
    this.version(1).stores({
      produtos: '++id, nome, descricao, preco, unidadeMedida, quantidade, mercado',
    });
  }
}
