import {Component, OnInit} from '@angular/core';
import {Produto} from "../../Models/produto.model";
import {ProdutoService} from "../../Services/produto.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToolbarModule} from "primeng/toolbar";
import {Button} from "primeng/button";
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {PaginatorModule} from "primeng/paginator";
import {InputTextareaModule} from "primeng/inputtextarea";
import {RadioButtonModule} from "primeng/radiobutton";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {InputTextModule} from "primeng/inputtext";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {ToastModule} from "primeng/toast";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-produto-list',
  standalone: true,
  imports: [
    ToolbarModule,
    Button,
    TableModule,
    DialogModule,
    PaginatorModule,
    InputTextareaModule,
    RadioButtonModule,
    ConfirmDialogModule,
    InputTextModule,
    CurrencyPipe,
    NgIf,
    ToastModule,
    ProgressSpinnerModule,
    NgForOf
  ],
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ProdutoListComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  produtoDialogo: boolean = false;
  listaDeProdutos: Produto[] = [];
  produto: Produto = {
    id: 0,
    descricao: "",
    mercado: [],
    nome: "",
    quantidade: 0,
    unidadeMedida: 'VAZIO'
  };
  produtosSelecionados!: Produto[] | null;
  enviado: boolean = false;
  unidadeMedidaDropDown: any = [
    {label: 'UNIDADE', value: 'UN'},
    {label: 'QUILOGRAMA', value: 'KG'},
    {label: 'LITRO', value: 'LT'}
  ];
  carregando: boolean = false;
  precosDialogo: boolean = false;
  mercado: { nome: string, preco: number } = {nome: '', preco: 0};
  mercados: { nome: string, preco: number }[] = [];

  constructor(private produtoService: ProdutoService, private confirmationService: ConfirmationService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.carregando = true;
    this.subscription = this.produtoService.produtos$.subscribe(produtos => {
      this.listaDeProdutos = produtos;
      this.ordenarProdutosPorNome();
      this.carregando = false;
    });
  }

  ordenarProdutosPorNome() {
    this.listaDeProdutos.sort((a, b) => a.nome.localeCompare(b.nome));
  }

  abrirNovo() {
    this.produto = {
      nome: "",
      descricao: "",
      mercado: [],
      quantidade: 0,
      unidadeMedida: 'VAZIO'
    };
    this.enviado = false;
    this.produtoDialogo = true;
  }

  deletarProdutosSelecionados = () => {
    this.confirmationService.confirm({
      message: 'Excluir os produtos?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        await this.produtoService.removerProdutos(this.produtosSelecionados!.map(p => p.id!)).then(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Produtos Deletados',
            life: 3000
          });
          this.produtosSelecionados = null;
        }).catch(() => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao deletar os produtos',
            life: 3000
          });
        });
      }
    });
  };

  editarProduto(product: Produto) {
    this.produto = {...product};
    this.mercados = this.produto.mercado;
    this.produtoDialogo = true;
  }

  deletarProduto(product: Produto) {
    this.confirmationService.confirm({
      message: 'Excluir ' + product.nome + '?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.produtoService.removerProduto(product.id).then(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Produto Deletado',
            life: 3000
          });
          this.produto = {
            id: 0,
            descricao: "",
            mercado: [],
            nome: "",
            quantidade: 0,
            unidadeMedida: 'VAZIO'
          }
        }).catch(() => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao deletar produto',
            life: 3000
          });
        });
      }
    });
  }

  esconderDialogo() {
    this.produtoDialogo = false;
    this.enviado = false;
    this.mercado = {nome: '', preco: 0};
    this.mercados = [];
  }

  abrirPrecos(id: number | undefined) {
    this.produto = this.listaDeProdutos.find(p => p.id === id)!;
    this.precosDialogo = true;
  }

  salvarProduto() {
    this.enviado = true;
    this.produto.nome = this.produto.nome?.trim();
    let produtoExistente = this.listaDeProdutos.find(p => p.nome === this.produto.nome);
    this.produto.mercado = this.mercados;
    if (produtoExistente) {
      this.produtoService.atualizarProduto(this.produto).then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Produto Atualizado',
          life: 3000
        });
      }).catch(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao atualizar produto',
          life: 3000
        })
      });
    } else {
      this.produtoService.adicionarProduto(this.produto).then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Produto Criado',
          life: 3000
        });
      }).catch(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao criar o produto',
          life: 3000
        })
      });
    }
    this.produtoDialogo = false;
    this.produto = {
      descricao: "",
      mercado: [],
      nome: "",
      quantidade: 0,
      unidadeMedida: 'VAZIO'
    };
    this.mercado = {nome: '', preco: 0};
    this.mercados = [];
  }

  adicionarMercado() {
    if (this.mercado.nome && this.mercado.preco) {
      this.mercados.push({...this.mercado});
      this.mercado = {nome: '', preco: 0};
    }
  }

  removerMercado(index: number) {
    this.mercados.splice(index, 1);
  }
}
