import { Injectable } from '@angular/core';
import { User } from '../store/users';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private userSubject = new BehaviorSubject([]);
  userList: Observable<User[]> = this.userSubject.asObservable();

  constructor() {}

  setUsers(userdata) {
    this.userSubject.next(userdata);
  }
}
