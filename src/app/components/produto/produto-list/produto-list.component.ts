import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.scss']
})
export class ProdutoListComponent {
  lista: Produto[] = [];

  @Output() retorno = new EventEmitter<Produto>();
  @Input() modoLancamento: boolean = false;


  ProdutoSelecionadoParaEdicao: Produto = new Produto();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  produtoService = inject(ProdutoService);

  constructor() {

    this.listAll();


  }


  listAll() {

    this.produtoService.listAll().subscribe({
      next: lista => { 
        this.lista = lista;
      },
      error: erro => { // QUANDO DÁ ERRO
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });

  }

  exemploErro() {

    this.produtoService.exemploErro().subscribe({
      next: lista => { // QUANDO DÁ CERTO
        this.lista = lista;
      },
      error: erro => { // QUANDO DÁ ERRO
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });

  }


  adicionar(modal: any) {
    this.ProdutoSelecionadoParaEdicao = new Produto();

    this.modalService.open(modal, { size: 'sm' });
  }

  editar(modal: any, produto: Produto, indice: number) {
    this.ProdutoSelecionadoParaEdicao = Object.assign({}, produto); 
    this.indiceSelecionadoParaEdicao = indice;

    this.modalService.open(modal, { size: 'sm' });
  }

  addOuEditarProduto(produto: Produto) {

    this.listAll();

  

    this.modalService.dismissAll();

  }
  excluir(id: number) {
    if (confirm('Deseja realmente excluir este produto?')) {
      this.produtoService.delete(id).subscribe({
        next: () => {
          this.lista = this.lista.filter(produto => produto.id !== id);
        },
        error: erro => {
          alert('Ocorreu um erro ao excluir o produto. Confira o console para mais informações.');
          console.error(erro);
        }
      });
    }
  }
  


  lancamento(produto: Produto){
    this.retorno.emit(produto);
  }
}



