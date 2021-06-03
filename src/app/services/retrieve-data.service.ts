import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RetrieveDataService {


  apiURL ='https://fathomless-bayou-20023.herokuapp.com' || 'http://localhost:4000'
  dataToSend: any=[];
   //apiURL:string= 'http://localhost:4000'

  constructor(private http: HttpClient) { }
  addMovies(data: any) {
    return this.http.post(this.apiURL + '/manage/addMovies', data)
  }
  addEvents(data: any) {
    return this.http.post(this.apiURL + '/manage/addEvents', data)
  }
  getMovies() {
    return this.http.get(this.apiURL + '/getMovies')
  }
  getEvents() {
    return this.http.get(this.apiURL + '/getEvents')
  }
  getOneMovie(_id: any) {
    return this.http.get(this.apiURL + '/getOneMovie/' + _id)
  }
  addTheatreTimeDetails(data: any) {
    return this.http.post(this.apiURL + '/addTheatreTimeDetails', data)
  }
  addTheatre(data: any) {
    return this.http.post(this.apiURL + '/addTheatre', data)
  }
  getTheatre() {
    return this.http.get(this.apiURL + '/getTheatreList')
  }
  getTime(_id: any) {
    return this.http.get(this.apiURL + '/getTime/' + _id)
  }
  confirmTicket(data) {
    return this.http.post(this.apiURL + '/confirmTicket', data)
  }
  getOneEvent(_id: any) {
    return this.http.get(this.apiURL+'/getOneEvent/'+_id)
  }


}
