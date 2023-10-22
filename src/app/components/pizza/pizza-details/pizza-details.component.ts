import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Pizza } from 'src/app/models/pizza';
import { Sabor } from 'src/app/models/sabor';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-pizza-details',
  templateUrl: './pizza-details.component.html',
  styleUrls: ['./pizza-details.component.scss']
})
export class PizzaDetailsComponent {
  @Input() pizza: Pizza = new Pizza();
  @Output() retorno = new EventEmitter<Pizza>();

  pizzaService = inject(PizzaService);
  isEdit = false; 
  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;


  constructor() {

  }

  ngOnInit() {
    this.isEdit = this.pizza.id > 0; 
  }

  salvar() {
    if (this.isEdit) {
      // Modo de edição
      this.pizzaService.update(this.pizza).subscribe({
        next: pizza => {
          this.retorno.emit(pizza);
        },
        error: erro => {
          alert('Deu erro! Observe o erro no console!');
          console.error(erro);
        }
      });
    } else {
      this.pizzaService.save(this.pizza).subscribe({
        next: pizza => {
          this.retorno.emit(pizza);
        },
        error: erro => {
          alert('Deu erro no cadastro! analise as informações e quantos sabores voce adicionou na pizza com o tamanho dela ');
          alert('Pizza P pode ter 1 sabor, pizza M pode ter 2 sabores, pizza G pode ter 3 sabores, pizza GG pode ter 4 sabores');
          console.error(erro);
        }
      });
    }
  }

  excluir(sabores: Sabor, indice: number) {

    this.pizza.sabores.splice(indice,1);
    
  }

  retornoProdutosList(sabor: Sabor) {

    if (this.pizza.sabores == null)
      this.pizza.sabores = [];

    this.pizza.sabores.push(sabor);
    this.modalRef.dismiss();
}


  lancar(modal: any) {
    this.modalRef = this.modalService.open(modal, { size: 'lg' });
  }

}


