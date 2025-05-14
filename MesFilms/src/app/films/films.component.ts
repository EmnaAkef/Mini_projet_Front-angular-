import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Film } from '../model/film.model';
import { FilmService } from '../services/film.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './films.component.html',
  styleUrl: './films.component.css'
})
export class FilmsComponent implements OnInit {
  films!: Film[]; // un tableau de Film
  constructor(private filmService: FilmService, public authService: AuthService) {
    // this.films = filmService.listeFilms();

    /* this.films = [
      {idFilm : 1,  nomFilm : "Avengers: Endgame", prixFilm : 15.99, dateSortie : new Date("2019-04-26")},
      {idFilm : 2,  nomFilm : "Parasite", prixFilm : 12.50, dateSortie : new Date("2019-05-30")},
      {idFilm : 3,  nomFilm :"Spirited Away", prixFilm : 10.75, dateSortie : new Date("2001-07-20")}
          ];  */
  }

  ngOnInit() {
    this.chargerFilms();
  }

  chargerFilms() {
    this.filmService.listeFilms().subscribe(flm => {
      console.log(flm);
      this.films = flm;
    });
  }

  supprimerFilm(f: Film) {
    let conf = confirm("Êtes-vous sûr de vouloir supprimer ce film ?");
    if (conf)
      this.filmService.supprimerFilm(f.idFilm).subscribe(() => {
        console.log("Film supprimé");
        this.chargerFilms();
      });
  }
}