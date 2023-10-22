import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Pedido } from 'src/app/models/pedido';
import { Pizza } from 'src/app/models/pizza';
import { Produto } from 'src/app/models/produto';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-pedido-details',
  templateUrl: './pedido-details.component.html',
  styleUrls: ['./pedido-details.component.scss']
})
export class PedidoDetailsComponent {
  @Input() pedido: Pedido = new Pedido();
  @Output() retorno = new EventEmitter<Pedido>();

  pedidoService = inject(PedidoService);
  isEdit = false; 

  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;

  constructor() {

  }

  ngOnInit() {
    this.isEdit = this.pedido.id > 0; 
  }

  salvar() {
    if (this.isEdit) {
      // Modo de edição
      this.pedidoService.update(this.pedido).subscribe({
        next: pedido => {
          this.retorno.emit(pedido);
        },
        error: erro => {
          alert('Deu erro! Observe o erro no console!');
          console.error(erro);
        }
      });
    } else {
      this.pedidoService.save(this.pedido).subscribe({
        next: pedido => {
          this.retorno.emit(pedido);
        },
        error: erro => {
          alert('Deu erro! Observe o erro no console!');
          console.error(erro);
        }
      });
    }
  }


  excluirPizza(pizza: Pizza, indice: number) {

    this.pedido.pizzas.splice(indice,1);
    
  }
  excluirProduto(produto: Produto, indice: number) {

    this.pedido.produtos.splice(indice,1);
    
  }
  
  retornoPizzasList(pizza: Pizza) {

    if (this.pedido.pizzas == null)
      this.pedido.pizzas = [];

    this.pedido.pizzas.push(pizza);
    this.modalRef.dismiss();
}
retornoProdutoList(produto: Produto) {

  if (this.pedido.produtos == null)
    this.pedido.produtos = [];

  this.pedido.produtos.push(produto);
  this.modalRef.dismiss();
}


  lancar(modal: any) {
    this.modalRef = this.modalService.open(modal, { size: 'lg' });
  }


}  
