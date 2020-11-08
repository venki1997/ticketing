import { Component, OnInit } from '@angular/core';
import { RetrieveDataService } from '../services/retrieve-data.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: any;
  isLoading: boolean= true;

  constructor(private data:RetrieveDataService) { }

  ngOnInit() {
    this.data.getEvents().subscribe((res:any)=>{
      this.events=res;
      this.isLoading=false;
    })
  }

}
