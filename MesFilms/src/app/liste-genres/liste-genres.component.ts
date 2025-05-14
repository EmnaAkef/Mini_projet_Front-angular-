import { Component, OnInit } from '@angular/core';
import { Genre } from '../model/genre.model';
import { FilmService } from '../services/film.service';
import { UpdateGenreComponent } from "../update-genre/update-genre.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-liste-genres',
  standalone: true,
  imports: [CommonModule, UpdateGenreComponent],
  templateUrl: './liste-genres.component.html',
  styles: ``
})
export class ListeGenresComponent implements OnInit {

  genres!: Genre[];
  ajout:boolean=true;

  updatedG: Genre = { "idG": null, "nomG": "" };

  constructor(private filmService: FilmService) { }

  ngOnInit(): void {
    this.filmService.listeGenres().
      subscribe(gens => {
        this.genres = gens._embedded.genres;
        console.log(gens);
      });
  }

  genreUpdated(gen: Genre) {
    console.log("Gen updated event", gen);
    this.filmService.ajouterGenre(gen).
      subscribe(() => this.chargerGenres());
  }

  chargerGenres() {
    this.filmService.listeGenres().
      subscribe(gens => {
        this.genres = gens._embedded.genres;
        console.log(gens);
      });
  }

  updateG(gen:Genre) { 
this.updatedG=gen; 
this.ajout=false;   
} 
}
