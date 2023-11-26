import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PizzaListComponent } from './components/pizza/pizza-list/pizza-list.component';
import { PizzaDetailsComponent } from './components/pizza/pizza-details/pizza-details.component';
import { SaborDetailsComponent } from './components/sabor/sabor-details/sabor-details.component';
import { SaborListComponent } from './components/sabor/sabor-list/sabor-list.component';
import { ClienteDetailsComponent } from './components/cliente/cliente-details/cliente-details.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ProdutoListComponent } from './components/produto/produto-list/produto-list.component';
import { ProdutoDetailsComponent } from './components/produto/produto-details/produto-details.component';
import { PedidoListComponent } from './components/pedido/pedido-list/pedido-list.component';
import { PedidoDetailsComponent } from './components/pedido/pedido-details/pedido-details.component';
import { FuncionarioListComponent } from './components/funcionario/funcionario-list/funcionario-list.component';
import { FuncionarioDetailsComponent } from './components/funcionario/funcionario-details/funcionario-details.component';
import { EnderecoListComponent } from './components/endereco/endereco-list/endereco-list.component';
import { EnderecoDetailsComponent } from './components/endereco/endereco-details/endereco-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/layout/header/header.component';
import { IndexComponent } from './components/layout/index/index.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/sistema/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    PizzaListComponent,
    PizzaDetailsComponent,
    SaborDetailsComponent,
    SaborListComponent,
    ClienteDetailsComponent,
    ClienteListComponent,
    ProdutoListComponent,
    ProdutoDetailsComponent,
    PedidoListComponent,
    PedidoDetailsComponent,
    FuncionarioListComponent,
    FuncionarioDetailsComponent,
    EnderecoListComponent,
    EnderecoDetailsComponent,
    HeaderComponent,
    IndexComponent,
    FooterComponent,
    LoginComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
