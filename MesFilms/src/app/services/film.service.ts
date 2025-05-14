import { Injectable } from '@angular/core'; 
import { Film } from '../model/film.model';
import { Genre } from '../model/genre.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GenreWrapper } from '../model/GenreWrapped.model';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  films!: Film[]; //un tableau de Film
  film!: Film;
  genres!: Genre[];

  apiURL: string = 'http://localhost:9093/films/api';
  apiURLGen: string = 'http://localhost:9093/films/genre';
  
  constructor(private http: HttpClient) {}

  listeFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(this.apiURL);
  }

  ajouterFilm(film: Film): Observable<Film> {
    return this.http.post<Film>(this.apiURL, film, httpOptions);
  }

  supprimerFilm(id: number) {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  consulterFilm(id: number): Observable<Film> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Film>(url);
  }

  listeGenres(): Observable<GenreWrapper> {
    return this.http.get<GenreWrapper>(this.apiURLGen);
  }

  consulterGenre(id: number): Genre {
    return this.genres.find((gen) => gen.idG == id)!;
  }

  updateFilm(film: Film): Observable<Film> {
    return this.http.put<Film>(this.apiURL, film, httpOptions);
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
return this.http.post<Genre>(this.apiURLGen, gen, httpOptions); 
} 

}