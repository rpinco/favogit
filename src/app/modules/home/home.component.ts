import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('avatarTemplate', { static: true }) avatarTemplate: TemplateRef<any>;
  @ViewChild('favTemplate', { static: true }) favTemplate: TemplateRef<any>;

  search = '';
  columns = [
    {prop: 'avatar_url', cellTemplate: this.avatarTemplate},
    {name: 'Login'},
    {name: 'Score'},
    {name: 'Url'},
    {name: 'Favorite', cellTemplate: this.favTemplate}
  ];
  rows = [];
  loadingIndicator = true;

  constructor(private usersService: UsersService, private router: Router) {
  }

  ngOnInit() {

  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterContentInit(): void {
    this.usersService.userList.subscribe(data => {
      this.rows = data;
    });
  }

  onSelect({selected}) {
    this.router.navigate(['/profile', selected[0].login]);
  }


}
