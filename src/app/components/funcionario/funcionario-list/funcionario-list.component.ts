import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Funcionario } from 'src/app/models/funcionario';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-funcionario-list',
  templateUrl: './funcionario-list.component.html',
  styleUrls: ['./funcionario-list.component.scss']
})
export class FuncionarioListComponent {
  lista: Funcionario[] = [];

  FuncionarioSelecionadoParaEdicao: Funcionario = new Funcionario();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  funcionarioService = inject(FuncionarioService);

  constructor() {

    this.listAll();


  }


  listAll() {

    this.funcionarioService.listAll().subscribe({
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

    this.funcionarioService.exemploErro().subscribe({
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
    this.FuncionarioSelecionadoParaEdicao = new Funcionario();

    this.modalService.open(modal, { size: 'lg' });
  }

  editar(modal: any, funcionario: Funcionario, indice: number) {
    this.FuncionarioSelecionadoParaEdicao = Object.assign({}, funcionario); 
    this.indiceSelecionadoParaEdicao = indice;

    this.modalService.open(modal, { size: 'lg' });
  }

  addOuEditarFuncionario(funcionario: Funcionario) {

    this.listAll();

  

    this.modalService.dismissAll();

  }
  excluir(id: number) {
    if (confirm('Deseja realmente excluir este livro?')) {
      this.funcionarioService.delete(id).subscribe({
        next: () => {
          this.lista = this.lista.filter(funcionario => funcionario.id !== id);
        },
        error: erro => {
          alert('Ocorreu um erro ao excluir o funcionario. Confira o console para mais informações.');
          console.error(erro);
        }
      });
    }
  }
  


}




