import { Injectable } from '@angular/core';
import { User } from '../store/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userList: User[];

  constructor() { }


  setUsers(users: User[]) {
    this.userList = users;
  }

  getUsers(): User[] {
    return this.userList;
  }
}
