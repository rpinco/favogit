import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';
import { Router } from '@angular/router';
import { pipe } from 'rxjs';
import { GithubService } from 'src/app/shared/services/github.service';
import { Store } from '@ngrx/store';
import { FavoriteState, Favorite, addFavoriteAction } from 'src/app/shared/store/favorites-store/favorites.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('avatarTemplate', { static: true }) avatarTemplate: TemplateRef<any>;
  @ViewChild('favTemplate', { static: true }) favTemplate: TemplateRef<any>;

  search = '';
  columns = [];
  rows = [];
  total = -1;
  loadingIndicator = true;
  loginSort = 'desc';
  scoreSort = 'desc';
  currentPage = 1;

  constructor(
    private usersService: UsersService,
    private favoriteStore: Store<FavoriteState>,
    private router: Router,
    private githubService: GithubService
    ) {
  }

  ngOnInit() {
    this.total = -1;
 
    this.columns = [
      {name: 'Login'},
      {name: 'Score'},
      {name: 'Url'},
      {name: 'Favorite', cellTemplate: this.favTemplate}
    ];
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterContentInit(): void {

    this.usersService.userList.subscribe(data => {
      console.log(data);
      if (data.length > 0) {
        this.rows = data[0].items;
        this.total = data[0].total_count;
      }
    });
      
      
      /*data => {
      this.rows = data.items;
      this.total = data.total;
    });*/
  }

  onSelect(selected) {
    this.router.navigate(['/profile', selected]);
  }

  sortByLogin() {
    this.loginSort = this.loginSort === 'asc' ? 'desc' : 'asc';
    this.githubService.filterSearch('login', this.loginSort).subscribe(response => {
      this.usersService.setUsers(response);
    });
  }

  sortByScore() {
    this.scoreSort = this.scoreSort === 'asc' ? 'desc' : 'asc';
    this.githubService.filterSearch('score', this.scoreSort).subscribe(response => {
      this.usersService.setUsers(response);
    });
  }

  getNextPage() {
    this.currentPage++;
    this.githubService.getNextPage().subscribe(response => {
      this.usersService.setUsers(response);
    });
  }

  getPreviousPage() {
    this.currentPage--;
    this.githubService.getPreviousPage().subscribe(response => {
      this.usersService.setUsers(response);
    });
  }

  addFavorite(username, id, event) {
    event.preventDefault();
    event.stopPropagation();
    const newFavorite = new Favorite();
    newFavorite.username = username;
    newFavorite.id = id;

    this.favoriteStore.dispatch(addFavoriteAction(newFavorite));
  }


}
