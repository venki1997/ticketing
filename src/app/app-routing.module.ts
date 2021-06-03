import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent} from './movies/movies.component';
import { HomeComponent} from './home/home.component';
import { LoginComponent } from './login/login/login.component';
import { ManageComponent } from './manage/manage.component';
import { AuthGuard } from './auth.guard';
import { TheatreComponent } from './theatre/theatre.component';
import { SeatComponent } from './seat/seat.component';
import { EventsComponent } from './events/events.component';


const routes: Routes = [
  {path:'movies', component:MoviesComponent},
  {path:'',component:HomeComponent},
  {path:'login/:text' , component:LoginComponent},
  {path:'manage' , component:ManageComponent,canActivate:[AuthGuard]},
  {path:'theatre/:cat/:_id' , component:TheatreComponent},
  {path:'seat/:tName/:movieName/:time' , component:SeatComponent},
  {path:'events',component:EventsComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
