import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-details',
  templateUrl: './cliente-details.component.html',
  styleUrls: ['./cliente-details.component.scss']
})
export class ClienteDetailsComponent {
  @Input() cliente: Cliente = new Cliente();
  @Output() retorno = new EventEmitter<Cliente>();

  clienteService = inject(ClienteService);
  isEdit = false; 

  constructor() {

  }

  ngOnInit() {
    this.isEdit = this.cliente.id > 0; 
  }

  salvar() {
    if (this.isEdit) {
      // Modo de edição
      this.clienteService.update(this.cliente).subscribe({
        next: cliente => {
          this.retorno.emit(cliente);
        },
        error: erro => {
          alert('Deu erro! Observe o erro no console!');
          console.error(erro);
        }
      });
    } else {
      this.clienteService.save(this.cliente).subscribe({
        next: cliente => {
          this.retorno.emit(cliente);
        },
        error: erro => {
          alert('Deu erro! Observe o erro no console!');
          console.error(erro);
        }
      });
    }
  }

}