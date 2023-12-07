import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'profile', component: EditprofileComponent },
  { path: 'post', component: CreatepostComponent },
  { path: 'search', component: SearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
