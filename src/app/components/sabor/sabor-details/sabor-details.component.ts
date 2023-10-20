import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Sabor } from 'src/app/models/sabor';
import { SaborService } from 'src/app/services/sabor.service';

@Component({
  selector: 'app-sabor-details',
  templateUrl: './sabor-details.component.html',
  styleUrls: ['./sabor-details.component.scss']
})
export class SaborDetailsComponent {
  @Input() sabor: Sabor = new Sabor();
  @Output() retorno = new EventEmitter<Sabor>();

  saborService = inject(SaborService);
  isEdit = false; 

  constructor() {

  }

  ngOnInit() {
    this.isEdit = this.sabor.id > 0; 
  }

  salvar() {
    if (this.isEdit) {
      // Modo de edição
      this.saborService.update(this.sabor).subscribe({
        next: sabor => {
          this.retorno.emit(sabor);
        },
        error: erro => {
          alert('Deu erro! Observe o erro no console!');
          console.error(erro);
        }
      });
    } else {
      this.saborService.save(this.sabor).subscribe({
        next: sabor => {
          this.retorno.emit(sabor);
        },
        error: erro => {
          alert('Deu erro! Observe o erro no console!');
          console.error(erro);
        }
      });
    }
  }

}