import { Component, OnInit, Output } from '@angular/core';
import { RetrieveDataService } from '../services/retrieve-data.service';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {

  allMovies: any = [];
  dataToSearch = []
  events: any = [];
  movies: any = [];
  isLoading = true;

  constructor(private data: RetrieveDataService) { }
  myfunc(value, index, array) {
    return value.lang == 'Tamil'
  }
  ngOnInit() {
    this.data.getMovies().subscribe((res: any) => {
      this.allMovies = res;
      this.movies = this.allMovies.filter(this.myfunc);
      this.data.getEvents().subscribe((res: any) => {
        this.events = res;        
        this.dataToSearch = this.allMovies.concat(this.events)
        this.data.dataToSend = this.dataToSearch;
        this.isLoading = false;
        console.log(this.events);
        console.log(res);         
        //this.data.dataToSend=this.allMovies         
        console.log(this.movies)

      })

    })


  }



}
