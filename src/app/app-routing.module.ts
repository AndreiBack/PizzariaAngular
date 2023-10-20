import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ClienteDetailsComponent } from './components/cliente/cliente-details/cliente-details.component';
import { EnderecoListComponent } from './components/endereco/endereco-list/endereco-list.component';
import { EnderecoDetailsComponent } from './components/endereco/endereco-details/endereco-details.component';
import { FuncionarioListComponent } from './components/funcionario/funcionario-list/funcionario-list.component';
import { FuncionarioDetailsComponent } from './components/funcionario/funcionario-details/funcionario-details.component';
import { PedidoDetailsComponent } from './components/pedido/pedido-details/pedido-details.component';
import { PedidoListComponent } from './components/pedido/pedido-list/pedido-list.component';
import { PizzaListComponent } from './components/pizza/pizza-list/pizza-list.component';
import { PizzaDetailsComponent } from './components/pizza/pizza-details/pizza-details.component';
import { ProdutoListComponent } from './components/produto/produto-list/produto-list.component';
import { ProdutoDetailsComponent } from './components/produto/produto-details/produto-details.component';
import { SaborListComponent } from './components/sabor/sabor-list/sabor-list.component';
import { SaborDetailsComponent } from './components/sabor/sabor-details/sabor-details.component';
import { IndexComponent } from './components/layout/index/index.component';

const routes: Routes = [
  {path:"", component:IndexComponent},
  {path: "pizzaria", component:IndexComponent, children:[
    {path:"clientes", component: ClienteListComponent},
    {path: "clientes/novo", component: ClienteDetailsComponent},

    {path:"enderecos", component: EnderecoListComponent},
    {path: "enderecos/novo", component: EnderecoDetailsComponent},

    {path:"funcionario", component: FuncionarioListComponent},
    {path: "funcionario/novo", component: FuncionarioDetailsComponent},

    {path:"pedido", component: PedidoListComponent},
    {path: "pedido/novo", component: PedidoDetailsComponent},

    
    {path:"pizza", component: PizzaListComponent},
    {path: "pizza/novo", component: PizzaDetailsComponent},

    {path:"produto", component: ProdutoListComponent},
    {path: "produto/novo", component: ProdutoDetailsComponent},

    {path:"sabor", component: SaborListComponent},
    {path: "sabor/novo", component: SaborDetailsComponent}
  ]
}



];





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
