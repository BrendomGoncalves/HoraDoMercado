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
import {CurrencyPipe, NgIf} from "@angular/common";
import {ToastModule} from "primeng/toast";
import {ProgressSpinnerModule} from "primeng/progressspinner";

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
    ProgressSpinnerModule
  ],
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ProdutoListComponent implements OnInit {
  produtoDialogo: boolean = false;
  listaDeProdutos!: Produto[];
  produto!: Produto;
  produtosSelecionados!: Produto[] | null;
  enviado: boolean = false;
  unidadeMedidaDropDown: any = [
    {label: 'UNIDADE', value: 'UN'},
    {label: 'QUILOGRAMA', value: 'KG'},
    {label: 'LITRO', value: 'LT'}
  ];
  carregando: boolean = false;

  constructor(private produtoService: ProdutoService, private confirmationService: ConfirmationService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.atualizarListaDeProdutos();
  }

  atualizarListaDeProdutos() {
    this.carregando = true;
    this.produtoService.obterProdutos().then((data) => {
      this.listaDeProdutos = data;
      this.ordenarProdutosPorNome();
      this.carregando = false;
    }).catch(() => {
      this.carregando = false;
    });
  }

  ordenarProdutosPorNome() {
    this.listaDeProdutos.sort((a, b) => a.nome.localeCompare(b.nome));
  }

  abrirNovo() {
    this.produto = {
      id: 0,
      descricao: "",
      mercado: "",
      nome: "",
      preco: 0,
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
          this.atualizarListaDeProdutos();
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
          this.atualizarListaDeProdutos();
          this.produto = {
            id: 0,
            descricao: "",
            mercado: "",
            nome: "",
            preco: 0,
            quantidade: 0,
            unidadeMedida: 'VAZIO'
          };
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
  }

  salvarProduto() {
    this.enviado = true;

    if (this.produto.nome?.trim()) {
      if (this.produto.id) {
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
          this.produtoService.obterProdutos().then((data) => {
            this.listaDeProdutos = data;
            this.ordenarProdutosPorNome();
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
        })
      }
      this.produtoDialogo = false;
      this.produto = {
        id: 0,
        descricao: "",
        mercado: "",
        nome: "",
        preco: 0,
        quantidade: 0,
        unidadeMedida: 'VAZIO'
      };
    }
  }
}
