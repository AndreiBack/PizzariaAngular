import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto-details',
  templateUrl: './produto-details.component.html',
  styleUrls: ['./produto-details.component.scss']
})
export class ProdutoDetailsComponent {
  @Input() produto: Produto = new Produto();
  @Output() retorno = new EventEmitter<Produto>();

  produtoService = inject(ProdutoService);
  isEdit = false; 

  constructor() {

  }

  ngOnInit() {
    this.isEdit = this.produto.id > 0; 
  }

  salvar() {
    if (this.isEdit) {
      this.produtoService.update(this.produto).subscribe({
        next: produto => {
          this.retorno.emit(produto);
        },
        error: erro => {
          alert('Deu erro! Observe o erro no console!');
          console.error(erro);
        }
      });
    } else {
      this.produtoService.save(this.produto).subscribe({
        next: produto => {
          this.retorno.emit(produto);
        },
        error: erro => {
          alert('Deu erro! Observe o erro no console!');
          console.error(erro);
        }
      });
    }
  }

}