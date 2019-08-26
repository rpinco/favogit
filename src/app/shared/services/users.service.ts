import { Injectable } from '@angular/core';
import { User } from '../store/users';
import { Observable, BehaviorSubject } from 'rxjs';
import { SearchResponse } from './github.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private userSubject = new BehaviorSubject([]);
  userList: Observable<SearchResponse[]> = this.userSubject.asObservable();

  constructor() {}

  setUsers(userdata) {
    this.userSubject.next(userdata);
  }
}
