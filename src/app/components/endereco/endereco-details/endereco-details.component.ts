import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Endereco } from 'src/app/models/endereco';
import { EnderecoService } from 'src/app/services/endereco.service';

@Component({
  selector: 'app-endereco-details',
  templateUrl: './endereco-details.component.html',
  styleUrls: ['./endereco-details.component.scss']
})
export class EnderecoDetailsComponent {
  @Input() endereco: Endereco = new Endereco();
  @Output() retorno = new EventEmitter<Endereco>();

  enderecoService = inject(EnderecoService);
  isEdit = false; 

  constructor() {

  }

  ngOnInit() {
    this.isEdit = this.endereco.id > 0; 
  }

  salvar() {
    if (this.isEdit) {
      // Modo de edição
      this.enderecoService.update(this.endereco).subscribe({
        next: livro => {
          this.retorno.emit(livro);
        },
        error: erro => {
          alert('Deu erro! Observe o erro no console!');
          console.error(erro);
        }
      });
    } else {
      this.enderecoService.save(this.endereco).subscribe({
        next: livro => {
          this.retorno.emit(livro);
        },
        error: erro => {
          alert('Deu erro! Observe o erro no console!');
          console.error(erro);
        }
      });
    }
  }

}