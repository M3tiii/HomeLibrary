import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { ModalModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SearcherComponent } from './searcher/searcher.component';
import { LibraryPageComponent } from './library-page/library-page.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';

import { StorageService } from './storage.service';
import { LibraryService } from './library.service';
import { ProfilePageComponent } from './profile-page/profile-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'library/:id', component: LibraryPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegistrationPageComponent },
  { path: 'profile', component: ProfilePageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    RegistrationPageComponent,
    LoginPageComponent,
    HomePageComponent,
    SearcherComponent,
    LibraryPageComponent,
    EditModalComponent,
    ProfilePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    ModalModule.forRoot()
  ],
  providers: [StorageService, LibraryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
