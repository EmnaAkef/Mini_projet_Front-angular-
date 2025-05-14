import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Film } from '../model/film.model';
import { FilmService } from '../services/film.service';
import { SearchFilterPipe } from '../search-filter.pipe';

@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [FormsModule, CommonModule,SearchFilterPipe],
  templateUrl: './recherche-par-nom.component.html',
  styles: ``
})
export class RechercheParNomComponent  implements OnInit{

 nomFilm! : string; 
  films!: Film[];
  searchTerm! : string;

   constructor(private filmService : FilmService) { }

  ngOnInit(): void {
     this.filmService.listeFilms().subscribe(flms => { 
      console.log(flms); 
      this.films = flms; 
      }); 
  }

  rechercherFlms(){ 
    if (this.nomFilm)
      
      this.filmService
        .rechercherParNom(this.nomFilm)
        .subscribe((flms) => {
          console.log(flms);
          this.films = flms;
        });
    else
      this.filmService.listeFilms().subscribe((flms) => {
        console.log(flms);
        this.films = flms;
      });


  
  } 

}
