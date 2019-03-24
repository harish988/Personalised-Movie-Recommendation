import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../../Models/user.model';

@Injectable()
export class StateService {

  private loggeduser = new BehaviorSubject<String>(null);
  currentUser = this.loggeduser.asObservable();


  constructor() { }

  changeUser(tuser: String) {
    this.loggeduser.next(tuser);
  }
}
