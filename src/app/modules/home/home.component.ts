import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/store/users';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  search = '';
  columns = [
    {name: 'Name'},
    {name: 'Url'},
    {name: 'Id'},
  ];
  rows = [];

  constructor(private usersService: UsersService) {

   }

  ngOnInit() {
    this.rows = [...this.usersService.getUsers()];
    console.log(this.rows)
  }


}
