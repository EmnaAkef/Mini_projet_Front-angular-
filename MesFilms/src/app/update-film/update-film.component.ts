import { Component, OnInit } from '@angular/core';
import { Film } from '../model/film.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmService } from '../services/film.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Genre } from '../model/genre.model';

@Component({
  selector: 'app-update-film',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-film.component.html',
  styles: ``,
})
export class UpdateFilmComponent implements OnInit {
  currentFilm = new Film();
  message!: string;
  genres!: Genre[];
  updatedGId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private filmService: FilmService
  ) {}

  ngOnInit(): void {
    this.filmService.listeGenres().
    subscribe(gens => {console.log(gens);
                       this.genres = gens._embedded.genres;
                       }
  );
    this.filmService.consulterFilm(this.activatedRoute.snapshot.params['id']).
    subscribe( flm =>{ this.currentFilm = flm; 
      this.updatedGId =   this.currentFilm.genre.idG!;
    
    } ) ;
  }

  updateFilm() {
    this.currentFilm.genre = this.genres. 
find(gen => gen.idG == this.updatedGId)!;
    this.filmService.updateFilm(this.currentFilm).subscribe(flm => { this.router.navigate(['films']); }  
); 
}
}