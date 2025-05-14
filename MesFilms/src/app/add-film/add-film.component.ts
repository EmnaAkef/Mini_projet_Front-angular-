import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Film } from '../model/film.model';
import { FilmService } from '../services/film.service';
import { Genre } from '../model/genre.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-film',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-film.component.html'
})
export class AddFilmComponent implements OnInit {

  newFilm = new Film();
  message!: string;
  genres!: Genre[];
  newIdG!: number;
  newG!: Genre;

  constructor(private filmService: FilmService,
    private router: Router
  ) { }

  ngOnInit() {
    this.filmService.listeGenres().
      subscribe(gens => {
        this.genres = gens._embedded.genres;
        console.log(gens);
      });
  }

  addFilm() {
    this.newFilm.genre = this.genres.find(gen => gen.idG == this.newIdG)!;
    this.filmService.ajouterFilm(this.newFilm)
      .subscribe(fil => {
        console.log(fil);
        this.router.navigate(['films']);
      });
  }
}