import { Component, OnInit } from '@angular/core';
import {NgForm, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { StateService } from '../services/state.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  fstate: Boolean;
  logUser: User;
  disp = false;

  constructor(private router: Router, private route: ActivatedRoute,
        private authservice: AuthService, private dservice: DataService, private sservice: StateService) { }

    ngOnInit() {
      this.loginForm = new FormGroup({
        'email'   : new FormControl(null, Validators.required),
        'password': new FormControl(null, Validators.required)
      });
  }

  onSubmit() {
    const val = this.loginForm.value;
    const sUser = new User('', '',  val.email, val.password);
    console.log(sUser);
      this.authservice.signIn(sUser).subscribe( (data: any) => {
     this.dservice.getid(val.email).subscribe( (res: any) => {
      console.log(val.email);
       this.sservice.changeUser(val.email);
     });
      this.router.navigate(['../home'], {relativeTo: this.route});
    });
  }

  signUp() {
    this.router.navigate(['../signup'], {relativeTo: this.route});
  }
}
