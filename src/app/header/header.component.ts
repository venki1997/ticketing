import { Component, OnInit } from '@angular/core';
import { RetrieveDataService } from '../services/retrieve-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements  OnInit {
   movies=[];
   searchText={name:''};
   constructor( private data:RetrieveDataService) { }
 
   ngOnInit() {
   }
search(){
  this.movies=this.data.dataToSend;
  console.log(this.movies)

}
   
 }