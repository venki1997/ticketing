import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder,NgForm} from '@angular/forms';
import { RetrieveDataService } from '../services/retrieve-data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  showTamil:boolean=true
showHindi:boolean=true;
showEnglish:boolean=true;
tamil:string;
hindi:string;
english:string;
movies:any =[];
tamilMovies:any=[];
englishMovies:any=[];
hindiMovies:any=[];
isLoading:boolean=true;
  currentURL: string;



  constructor(private data:RetrieveDataService,private fb:FormBuilder,private route:Router) { }
  myfun(value:any){
    return value.lang == 'Tamil'
  }
  myfun2(value:any){
    return value.lang == 'English'
  }
  myfun3(value:any){
    return value.lang == 'Hindi'
  }

  ngOnInit() {
    this.data.getMovies().subscribe((res: any) => {
      this.movies = res;
     // console.log(res);   
      this.tamilMovies = this.movies.filter(this.myfun);
    this.hindiMovies = this.movies.filter(this.myfun2);
    this.englishMovies = this.movies.filter(this.myfun3);  
    //console.log(this.tamilMovies)
   // console.log(this.hindiMovies)
    //console.log(this.englishMovies)
      this.isLoading=false
   // console.log(this.movies)
    
    })
    this.currentURL = this.route.url;

  }
  
  

}
