import { Component } from '@angular/core';
import { User } from '../model/user.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {

  user = new User();
  erreur= 0 ;
  message : string = "login ou mot de passe erronés..";
  err:number = 0;

  constructor(private authService : AuthService, 
             private  router: Router) { }

  onLoggedin() 
  { 
  this.authService.login(this.user).subscribe({ 
        next: (data) => { 
          let jwToken = data.headers.get('Authorization')!; 
          this.authService.saveToken(jwToken); 
          this.router.navigate(['/']);   
        }, 
        error: (err: any) => { 
          this.err = 1;  
           if (err.error.errorCause=='disabled') 
             this.message="Utilisateur désactivé, Veuillez contacter votre Administrateur"; 
        } 
        });

        }
        }
 


