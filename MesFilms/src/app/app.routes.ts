import { Routes } from '@angular/router';
import { FilmsComponent } from './films/films.component';
import { AddFilmComponent } from './add-film/add-film.component';
import { UpdateFilmComponent } from './update-film/update-film.component';
import { RechercheParGenreComponent } from './recherche-par-genre/recherche-par-genre.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeGenresComponent } from './liste-genres/liste-genres.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { filmGuard } from './film.guard';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';

export const routes: Routes = [
  {path: "films", component : FilmsComponent},
  {path: "add-film", component : AddFilmComponent, canActivate:[filmGuard]},
  {path: "updateFilm/:id", component : UpdateFilmComponent},
   {path: "", redirectTo: "films", pathMatch: "full"},
   {path: "rechercheParNom", component : RechercheParNomComponent}, 
    {path: "listeGenres", component : ListeGenresComponent},
   {path: "rechercheParGenre", component : RechercheParGenreComponent},
    {path:  'app-forbidden', component: ForbiddenComponent},
    {path:'register',component:RegisterComponent}, 
     { path: 'verifEmail', component: VerifEmailComponent }, 
   {path:  'login', component: LoginComponent}  
];
