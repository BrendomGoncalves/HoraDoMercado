import { Component } from '@angular/core';
import {ProdutoListComponent} from "../../Components/produto-list/produto-list.component";

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [
    ProdutoListComponent
  ],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent {

}
