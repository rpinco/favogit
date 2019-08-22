import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { debounceTime, map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @ViewChild('searchbar', {static: false}) searchinput: ElementRef;

  search = '';

  constructor(private githubService: GithubService, private usersService: UsersService) { }

  ngOnInit() {

  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewInit() {

    fromEvent(this.searchinput.nativeElement, 'keyup').pipe(
      debounceTime(1000)
    )
    .subscribe(() => {
      this.onSearch();
    });

  }


  onSearch() {
    this.githubService.getUsers(this.search)
    .subscribe(data => {
      this.usersService.setUsers(data);
    });
  }
}
