import { MapRouteComponent } from './components/map-route/map-route.component';
import { LanguagePipe } from './pipes/language.pipe';
import { ValidationDirective } from './configs/validation.directive';
import { LanguageService } from './services/language.service';
import { HttpService } from './services/http.service';
import { AuthenticationService } from './services/authentication.service';
import { GlobalValueService } from './services/global-value.service';
import { AllowAnonymousGuard } from './guards/allowAnonymous.guard';
import { AuthenticationGuard } from './guards/authentication.guard';
import { RoutingModule } from './app.routing';
import { SharedModule } from './components/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    MapRouteComponent
  ],
  imports: [
    RoutingModule,
    BrowserModule,
    HttpModule
  ],
  providers: [
    AuthenticationGuard,
    AllowAnonymousGuard,
    GlobalValueService,
    AuthenticationService,
    HttpService,
    LanguageService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
