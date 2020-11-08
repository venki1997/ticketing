import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RetrieveDataService } from '../services/retrieve-data.service';
import { LoginService } from '../services/login.service';




@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})
export class SeatComponent implements OnInit {
  bookedSeats = [];
  noOfSeats: number = 0;
  TheatreName: any;
  message: any;
  confirmedTicket: any = { bookedSeats: 0, TheatreName: 0, confirmedTime: 0, userName: 0 }
  confirmedTime: any;
  ack: boolean = false;
  date: string;
  mobile: any;
  bookedSeatsJoined: string;
  movieName: any;
  barCodeValue: any = 3421543216542135435;
  flag: boolean = false;
  //dateObject= 
  currentDate = new Date();
  isClicked: boolean = false;
  constructor(private route: ActivatedRoute, private data: RetrieveDataService, private router: Router,
    private login: LoginService) { }

  ngOnInit() {


    this.route.params.subscribe((params: Params) => {
      this.TheatreName = params.tName;
      this.confirmedTime = params.time;
      this.movieName = params.movieName;
      //console.log(params)

    })
  }
  objectConstructor(a, b, c, d, e) {
    this.confirmedTicket.bookedSeats = a;
    this.confirmedTicket.TheatreName = b;
    this.confirmedTicket.confirmedTime = c;
    this.confirmedTicket.userName = localStorage.getItem('username');
    this.confirmedTicket.mobile = d;
    this.confirmedTicket.date = e
    return this.confirmedTicket
  }

  seatSelections(event) {
    //console.log(event);
    if (event.target.checked == true) {
      this.bookedSeats.push(event.target.value);
      this.bookedSeatsJoined = this.bookedSeats.join(',')

    }
    if (event.target.checked == false) {
      this.bookedSeats.splice(this.bookedSeats.indexOf(event.target.value), 1);
      this.bookedSeatsJoined = this.bookedSeats.join(',')
    }
    this.noOfSeats = this.bookedSeats.length;
    //console.log(this.bookedSeats)

  }
  setFlag() {

    let splitedDate = this.date.split('-');
    let y = parseInt(splitedDate[0], 10);
    let m = parseInt(splitedDate[1], 10) - 1;
    let d = parseInt(splitedDate[2], 10);
    var formattedDate = new Date(y, m, d)
    //console.log(this.date)
    //console.log(splitedDate)
    //console.log(formattedDate)
    //console.log(formattedDate>this.currentDate)


    if (this.bookedSeats.length > 0 &&
      this.mobile.length == 10 &&
      formattedDate >= this.currentDate
    ) {

      this.confirmTicket();
    }
    else {
      this.flag = true
    }

  }
  confirmTicket() {

    if (localStorage.getItem("user") && !this.login.isUserTokenValid()) {
      this.objectConstructor(this.bookedSeats, this.TheatreName, this.confirmedTime, this.mobile, this.date)
      //console.log(this.confirmedTicket)
      this.data.confirmTicket(this.confirmedTicket).subscribe((res: any) => {
        this.message = res;
        //console.log(res)
        if (res.length == 16) {
          this.barCodeValue = res;
          this.ack = true;
        }
      })

    }
    else {
      this.router.navigateByUrl('/login/Login')
    }
  }

  print() {
    var printContents = document.getElementById('printarea').innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }

}
