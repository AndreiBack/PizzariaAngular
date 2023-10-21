import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Pizza } from 'src/app/models/pizza';
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
          alert('Deu erro! Observe o erro no console!');
          console.error(erro);
        }
      });
    }
  }

}
