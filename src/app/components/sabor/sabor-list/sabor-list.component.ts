import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Sabor } from 'src/app/models/sabor';
import { SaborService } from 'src/app/services/sabor.service';

@Component({
  selector: 'app-sabor-list',
  templateUrl: './sabor-list.component.html',
  styleUrls: ['./sabor-list.component.scss']
})
export class SaborListComponent {
  lista: Sabor[] = [];

  SaborSelecionadoParaEdicao: Sabor = new Sabor();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  saborService = inject(SaborService);

  constructor() {

    this.listAll();


  }


  listAll() {

    this.saborService.listAll().subscribe({
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

    this.saborService.exemploErro().subscribe({
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
    this.SaborSelecionadoParaEdicao = new Sabor();

    this.modalService.open(modal, { size: 'md' });
  }

  editar(modal: any, sabor: Sabor, indice: number) {
    this.SaborSelecionadoParaEdicao = Object.assign({}, sabor); 
    this.indiceSelecionadoParaEdicao = indice;

    this.modalService.open(modal, { size: 'md' });
  }

  addOuEditarSabor(sabor: Sabor) {

    this.listAll();

    this.modalService.dismissAll();

  }
  excluir(id: number) {
    if (confirm('Deseja realmente excluir este sabor?')) {
      this.saborService.delete(id).subscribe({
        next: () => {
          this.lista = this.lista.filter(livro => livro.id !== id);
        },
        error: erro => {
          alert('Ocorreu um erro ao excluir o sabor. Confira o console para mais informações.');
          console.error(erro);
        }
      });
    }
  }
  


}