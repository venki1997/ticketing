import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MoviesComponent } from './movies/movies.component';
import { HomeComponent } from './home/home.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { FooterComponent } from './footer/footer.component';
import {  ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TheatreComponent } from './theatre/theatre.component';
import { ManageComponent } from './manage/manage.component';
import { LoginComponent } from './login/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { SpinnerComponent } from './spinner/spinner.component';
import { SeatComponent } from './seat/seat.component';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { EventsComponent } from './events/events.component';
import { TokenInterceptor } from './token.interceptor';
import { NgxBarcodeModule } from 'ngx-barcode';
import { FilterPipeModule } from 'ngx-filter-pipe'

 
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("615352003318-e6ob4b1pk46m64hfnomnfe6aubitp1no.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("Facebook-App-Id")
  }
]);
 
export function provideConfig() {
  return config;
}



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MoviesComponent,
    HomeComponent,
    HomeContentComponent,
    FooterComponent,
    TheatreComponent,
    ManageComponent,
    LoginComponent,
    SpinnerComponent,
    SeatComponent,
    EventsComponent,
    
    
     ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    JwtModule,
    FormsModule,
    SocialLoginModule,
    NgxBarcodeModule,
    FilterPipeModule
  
     ],
  providers: [     {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  },
  {
    provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
