import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginService = inject(LoginService);
  login: Login = new Login();
  roteador = inject(Router);

  constructor() {
    this.loginService.removeToken();
  }

  logar() {
    this.loginService.logar(this.login).subscribe({
      next: usuario => {localStorage.setItem("token", usuario.token),this.roteador.navigate(['admin']);
    },
      error: erro => {console.log(erro);
      }
    });

   
  }
}
