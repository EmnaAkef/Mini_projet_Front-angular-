import { Injectable } from '@angular/core';
import { Film } from '../model/film.model';  // 
import { Genre } from '../model/genre.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GenreWrapper } from '../model/GenreWrapped.model';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root',
})
export class FilmService {
  films!: Film[]; //un tableau de Film
  film!: Film;
  genres!: Genre[];

  apiURL: string = 'http://localhost:9093/films/api';
  apiURLG: string = 'http://localhost:9093/films/genre';

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  listeFilms(): Observable<Film[]> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Film[]>(this.apiURL + "/all", { headers: httpHeaders });

  }

  ajouterFilm(flm: Film): Observable<Film> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.post<Film>(this.apiURL + "/addfilm", flm, { headers: httpHeaders });
  }



  supprimerFilm(id: number) {
    const url = `${this.apiURL}/delfilm/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.delete(url, { headers: httpHeaders });
  }

  consulterFilm(id: number): Observable<Film> {
    const url = `${this.apiURL}/getbyid/${id}`;
    console.log(url);
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Film>(url, { headers: httpHeaders });
  }

  updateFilm(flm: Film): Observable<Film> {
    console.log(flm.genre);
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.put<Film>(this.apiURL + "/updatefilm", flm, { headers: httpHeaders });
  }



  listeGenres(): Observable<GenreWrapper> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<GenreWrapper>(this.apiURLG, { headers: httpHeaders });

  }



  consulterGenre(id: number): Genre {
    return this.genres.find((gen) => gen.idG == id)!;
  }



  rechercherParGenre(idGen: number): Observable<Film[]> {
    const url = `${this.apiURL}/FilmsG/${idGen}`;
    return this.http.get<Film[]>(url);
  }

  rechercherParNom(nom: string): Observable<Film[]> {
    const url = `${this.apiURL}/flmsByName/${nom}`;
    return this.http.get<Film[]>(url);
  }

  ajouterGenre( gen: Genre):Observable<Genre>{ 
return this.http.post<Genre>(this.apiURLG, gen, httpOptions); 
} 


}
