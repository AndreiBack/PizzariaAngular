import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.scss']
})
export class PedidoListComponent {
  lista: Pedido[] = [];

 PedidoSelecionadoParaEdicao: Pedido = new Pedido();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  pedidoService = inject(PedidoService);

  constructor() {

    this.listAll();


  }


  listAll() {

    this.pedidoService.listAll().subscribe({
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

    this.pedidoService.exemploErro().subscribe({
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
    this.PedidoSelecionadoParaEdicao = new Pedido();

    this.modalService.open(modal, { size: 'md' });
  }

  editar(modal: any, pedido: Pedido, indice: number) {
    this.PedidoSelecionadoParaEdicao = Object.assign({}, pedido); 
    this.indiceSelecionadoParaEdicao = indice;

    this.modalService.open(modal, { size: 'md' });
  }

  addOuEditarPedido(pedido: Pedido) {

    this.listAll();

  

    this.modalService.dismissAll();

  }
  excluir(id: number) {
    if (confirm('Deseja realmente excluir este pedido?')) {
      this.pedidoService.delete(id).subscribe({
        next: () => {
          this.lista = this.lista.filter(pedido => pedido.id !== id);
        },
        error: erro => {
          alert('Ocorreu um erro ao excluir o pedido. Confira o console para mais informações.');
          console.error(erro);
        }
      });
    }
  }
  


}



