import { Routes } from '@angular/router';
import {ProdutosComponent} from "./Pages/produtos/produtos.component";
import {PaginaInicialComponent} from "./Pages/pagina-inicial/pagina-inicial.component";
import {CarrinhoComponent} from "./Pages/carrinho/carrinho.component";

export const routes: Routes = [
  { path: '', component: PaginaInicialComponent, pathMatch: 'full' },
  { path: 'pagina-inicial', component: PaginaInicialComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: '**', redirectTo: '' }
];
