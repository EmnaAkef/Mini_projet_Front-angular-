import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Genre } from '../model/genre.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-genre',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-genre.component.html',
  styles: ``
})
export class UpdateGenreComponent implements OnInit{
  @Input() 
  genre! : Genre; 

  @Output() 
  genreUpdated = new EventEmitter<Genre>();

  @Input()
  ajout!:boolean;

  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateGenre ",this.genre); 
  }

  saveGenre(){
      this.genreUpdated.emit(this.genre);
    }

}
