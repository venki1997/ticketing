import { Component, OnInit } from '@angular/core';
import { RetrieveDataService } from '../services/retrieve-data.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-theatre',
  templateUrl: './theatre.component.html',
  styleUrls: ['./theatre.component.css']
})
export class TheatreComponent implements OnInit {
  _id: any;
  movie: any;
  isLoading: boolean = true;
  movies: any;
  time = [{ a: 1, b: 2, c: 3 }, { a: 4, b: 5 }, { a: 4, b: 5, c: 6 }, { a: 4, c: 6 }]
  //responseTime: any;
  response: any;
  cat: any;

  constructor(private data: RetrieveDataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this._id = params._id;
      this.cat = params.cat;
      console.log(params)

    })
    if (this.cat == 'event') {
      this.data.getOneEvent(this._id).subscribe((res:any)=>{
        this.movies = res;
        this.movie = this.movies[0]
        console.log(res)
      })
    }
    else {
      this.data.getOneMovie(this._id).subscribe((res: any) => {
        this.movies = res;
        console.log(res);
        this.movie = this.movies[0]
        console.log(this.movie)
      })
    }
    this.data.getTime(this._id).subscribe((res: any) => {
      this.response = res;
      console.log(this.time)
      console.log(res);
      this.isLoading = false;

    })

  }

}
