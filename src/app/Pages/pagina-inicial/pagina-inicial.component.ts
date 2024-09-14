import {Component, OnInit} from '@angular/core';
import {ProdutoEstatisticaService} from "../../Services/produto-estatistica.service";
import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.css'
})
export class PaginaInicialComponent implements OnInit{
  quantidadeProdutos: number = 0;
  quantidadeProdutosMercado: [string, number][] = [];
  produtosMaiorQuantidade: [string, number][] = [];

  constructor(private produtoEstatistica: ProdutoEstatisticaService) { }

  async ngOnInit(): Promise<void> {
    this.quantidadeProdutos = await this.produtoEstatistica.quantidadeProdutos();
    this.quantidadeProdutosMercado = await this.produtoEstatistica.quantidadeProdutosMercado();
    this.produtosMaiorQuantidade = await this.produtoEstatistica.produtosMaiorQuantidade();
  }
}
