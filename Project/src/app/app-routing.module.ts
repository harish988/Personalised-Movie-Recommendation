import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { Home2Component } from './home2/home2.component';
import { Login2Component } from './login2/login2.component';

const routes: Routes = [
  {path: '' , redirectTo: '/login', pathMatch: 'full'},
  {  path: 'login' , component: LoginComponent },
  {  path: 'login2' , component: Login2Component },
  { path: 'signup' , component: SignupComponent},
  {  path: 'home'  , component: HomeComponent},
  {  path: 'home2'  , component: Home2Component},
  {path: '**', redirectTo: '/notfound', pathMatch: 'full'},
  {path: 'notfound', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
