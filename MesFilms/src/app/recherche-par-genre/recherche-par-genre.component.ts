import { Component, OnInit } from '@angular/core';
import { Film } from '../model/film.model';
import { Genre } from '../model/genre.model';
import { FilmService } from '../services/film.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recherche-par-genre',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './recherche-par-genre.component.html',
  styles: ``
})
export class RechercheParGenreComponent implements OnInit {

  films! : Film[];
  IdGenre! : number;
  genres! : Genre[];

  constructor(private filmService : FilmService) {}

  ngOnInit(): void {
    this.filmService.listeGenres().subscribe(gens => 
      {this.genres = gens._embedded.genres;
       console.log(gens);
      });
  }

  onChange() {
    this.filmService.rechercherParGenre(this.IdGenre).subscribe(flm => {this.films = flm});
  }
}