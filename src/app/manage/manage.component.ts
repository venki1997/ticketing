import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RetrieveDataService } from '../services/retrieve-data.service';
import * as $ from "jquery";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  events: any;


  constructor(private data: RetrieveDataService) { }
  

  selectedImg: any;
  formData: any;
  message: any;
  showContent: string = 'showAddMovie';
  moviesList: any;
  theatre: any;
  id: any;
  showtime: any = [];
  isTimeDetailsShowed: boolean;
  clicked = true;

  @ViewChild('addTheatreTimeDetails', { static: false }) form: any;

  addContent: FormGroup = new FormGroup({
    cat: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    lang: new FormControl('', [Validators.required]),
    des: new FormControl('', [Validators.required]),
    theatre: new FormControl('', [Validators.required])

  })
  formValid: boolean = !this.addContent.valid

  /*addTheatreTimeDetails: FormGroup = new FormGroup({
    movie: new FormControl(),
    theatre: new FormControl(),
    movieid: new FormControl(),
    time: new FormControl()

  })*/

  addTheatre: FormGroup = new FormGroup({
    theatrename: new FormControl(''),
    location: new FormControl(''),
    row: new FormControl(''),
    coloumn: new FormControl(''),
    showtime1: new FormControl(''),
    showtime2: new FormControl(''),
    showtime3: new FormControl(''),
    showtime4: new FormControl(''),
  })



  showContents(value) {

    this.showContent = value;
    //this.isTimeDetailsShowed =!this.isTimeDetailsShowed
    //if (value == "showTheatreDetails"){this.showTheatreTimedetails()}
  }
  showTheatreTimedetails(value) {
    this.showContent = value;
    $('#theatresname')
      .find('option')
      .remove()
      .end()
      .append('<option value="">please select</option>')
      .val('');
    $('#movie')
      .find('option')
      .remove()
      .end()
      .append('<option value="">Please Select</option>')
      .val('');
    if (this.clicked == true) { this.showdetails() }
  }
  ngOnInit(){
    //****************************add theatre name **************************/
    this.data.getTheatre().subscribe(res => {
      this.theatre = res;
      console.log(this.theatre)
      var select1 = document.getElementById("theatresname");
      for (var i = 0; i < this.theatre.length; i++) {
        var opt1 = this.theatre[i].theatrename;
        var el1 = document.createElement("option");
        el1.textContent = opt1;
        el1.value = opt1;
        select1.appendChild(el1);
      }

    })
  }

  showdetails() {
    this.clicked = false;
    console.log('list caled')
    this.data.getEvents().subscribe((res:any)=>{
      console.log(res)
      this.events = res.filter(e=>e.name);
      var select = document.getElementById("movie");
      for (var i = 0; i < this.events.length; i++) {
        var opt = this.events[i].name;
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
      }
    })
    this.data.getMovies().subscribe((res: any) => {
      this.moviesList = res.filter(e => e.name);
      console.log(this.moviesList);
      this.clicked = true;
      //*************************add movie name***************/
      var select = document.getElementById("movie");
      for (var i = 0; i < this.moviesList.length; i++) {
        var opt = this.moviesList[i].name;
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
      }

    })

    //console.log((document.getElementById('theatresname') as HTMLSelectElement).options.length)
    

  }


  injectId(event: any) {
    for (let i of this.moviesList) {
      if (i.name == event.target.value) {
        this.id = i._id
      }
    }
    for (let i of this.events) {
      if (i.name == event.target.value) {
        this.id = i._id
      }
    }
  }
  injectTime(event: any) {
    $('#time')
    .find('option')
    .remove()
    .end()    
    .val('');

    setTimeout(()=>this.callInjectTime(event), 3000)
  }


  callInjectTime(event: any) {

    for (let i of this.theatre) {
      if (i.theatrename == event.target.value) {
        console.log(Object.keys(i).length);
        console.log('it works')
        this.showtime.push(i.showtime1);
        this.showtime.push(i.showtime2);
        this.showtime.push(i.showtime3);
        this.showtime.push(i.showtime4);

        let select = document.getElementById('time')
        for (let d of this.showtime) {
          let el = document.createElement('option')
          el.textContent = d
          el.value = d
          select.appendChild(el)
        }
      }
    }
  }
  onClick() {
    console.log(this.addContent.value);
    //if (this.addContent.valid) { this.formValid = false; }
    this.formData = this.addContent.value;
    this.formData.imgPath = this.selectedImg;
    console.log(this.formData);
    if (this.formData.cat == 'movie') {
      this.data.addMovies(this.formData).subscribe((res: any) => {
        this.message = res;
        console.log(res);
        this.addContent.reset();

      })
    }
    else {
      this.data.addEvents(this.formData).subscribe((res: any) => {
        this.message = res;
        console.log(res);
        this.addContent.reset();
      })
    }
  }
  img(event: any) {
    console.log(event);
    this.selectedImg = event.target.files[0];
    console.log(this.selectedImg)
  }

  addTheatres() {
    this.data.addTheatre(this.addTheatre.value).subscribe(res => {
      this.message = res;
      this.addTheatre.reset();
    })
  }
  addTheatreTimeDetailss(data) {
    console.log(data)
    this.data.addTheatreTimeDetails(data).subscribe(res => {
      this.message = res;
      let select = document.getElementById('time') as HTMLSelectElement;
      select.options.length = 0;
      console.log(this.form)
      this.form.reset();
    })
  }


}




