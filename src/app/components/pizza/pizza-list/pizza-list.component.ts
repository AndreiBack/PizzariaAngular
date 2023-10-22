import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pizza } from 'src/app/models/pizza';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.scss']
})
export class PizzaListComponent {
  lista: Pizza[] = [];

  @Output() retorno = new EventEmitter<Pizza>();
  @Input() modoLancamento: boolean = false;

  PizzaSelecionadoParaEdicao: Pizza = new Pizza();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  pizzaService = inject(PizzaService);

  constructor() {

    this.listAll();


  }


  listAll() {

    this.pizzaService.listAll().subscribe({
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

    this.pizzaService	.exemploErro().subscribe({
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
    this.PizzaSelecionadoParaEdicao = new Pizza();

    this.modalService.open(modal, { size: 'lg' });
  }

  editar(modal: any, pizza: Pizza, indice: number) {
    this.PizzaSelecionadoParaEdicao = Object.assign({}, pizza); 
    this.indiceSelecionadoParaEdicao = indice;

    this.modalService.open(modal, { size: 'lg' });
  }

  addOuEditarPizza(pizza: Pizza) {

    this.listAll();

  

    this.modalService.dismissAll();

  }
  excluir(id: number) {
    if (confirm('Deseja realmente excluir esta pizza?')) {
      this.pizzaService.delete(id).subscribe({
        next: () => {
          this.lista = this.lista.filter(pizza => pizza.id !== id);
        },
        error: erro => {
          alert('Ocorreu um erro ao excluir a pizza. Confira o console para mais informações.');
          console.error(erro);
        }
      });
    }
  }
  


  lancamento(pizza: Pizza){
    this.retorno.emit(pizza);
  }

}



