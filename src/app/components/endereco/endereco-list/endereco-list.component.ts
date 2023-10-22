import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Endereco } from 'src/app/models/endereco';
import { EnderecoService } from 'src/app/services/endereco.service';

@Component({
  selector: 'app-endereco-list',
  templateUrl: './endereco-list.component.html',
  styleUrls: ['./endereco-list.component.scss']
})
export class EnderecoListComponent {
  lista: Endereco[] = [];

  @Output() retorno = new EventEmitter<Endereco>();
  @Input() modoLancamento: boolean = false;

  EnderecoSelecionadoParaEdicao: Endereco = new Endereco();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  enderecoService = inject(EnderecoService);

  constructor() {

    this.listAll();


  }


  listAll() {

    this.enderecoService.listAll().subscribe({
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

    this.enderecoService.exemploErro().subscribe({
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
    this.EnderecoSelecionadoParaEdicao = new Endereco();

    this.modalService.open(modal, { size: 'sm' });
  }

  editar(modal: any, endereco: Endereco, indice: number) {
    this.EnderecoSelecionadoParaEdicao = Object.assign({}, endereco); 
    this.indiceSelecionadoParaEdicao = indice;

    this.modalService.open(modal, { size: 'md' });
  }

  addOuEditarEndereco(endereco: Endereco) {

    this.listAll();

  

    this.modalService.dismissAll();

  }
  excluir(id: number) {
    if (confirm('Deseja realmente excluir este endereco?')) {
      this.enderecoService.delete(id).subscribe({
        next: () => {
          this.lista = this.lista.filter(endereco => endereco.id !== id);
        },
        error: erro => {
          alert('Ocorreu um erro ao excluir o endereco. Confira o console para mais informações.');
          console.error(erro);
        }
      });
    }
  }
  
  lancamento(endereco: Endereco){
    this.retorno.emit(endereco);
  }

}


