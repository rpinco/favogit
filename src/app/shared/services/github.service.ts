import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../store/users';
import { map } from 'rxjs/operators';


export interface SearchResponse {
  incomplete_results: boolean;
  items: User[];
  total_count: number;
}

export interface UserResponse {
  'login': string;
  'id': number;
  'node_id': string;
  'avatar_url': string;
  'gravatar_id': string;
  'url': string;
  'html_url': string;
  'followers_url': string;
  'following_url': string;
  'gists_url': string;
  'starred_url': string;
  'subscriptions_url': string;
  'organizations_url': string;
  'repos_url': string;
  'events_url': string;
  'received_events_url': string;
  'type': string;
  'site_admin': boolean;
  'name': string;
  'company': string;
  'blog': string;
  'location': string;
  'email': string;
  'hireable': boolean;
  'bio': string;
  'public_repos': number;
  'public_gists': number;
  'followers': number;
  'following': number;
  'created_at': string;
  'updated_at': string;
}

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private baseUrl = 'https://api.github.com/';
  private currentSearch = '';
  private sortName = '';
  private sortOrder = '';
  private page = 1;

  constructor(private http: HttpClient) {}


  public getUsers(search: string) {
    this.currentSearch = search;
    return this.queryGithub(this.currentSearch, 'login', 'desc', 1);
  }

  public filterSearch(filterName: string, sortOrder: string) {
    this.sortName = filterName;
    this.sortOrder = sortOrder;

    return this.queryGithub(this.currentSearch, this.sortName, this.sortOrder, this.page);
  }

  public getNextPage() {
    this.page++;
    return this.queryGithub(this.currentSearch, this.sortName, this.sortOrder, this.page);
  }
  public getPreviousPage() {
    this.page--;
    return this.queryGithub(this.currentSearch, this.sortName, this.sortOrder, this.page);
  }


  public getUser(username: string) {
    return this.http.get<UserResponse>(`${this.baseUrl}users/${username}`);
  }


  private queryGithub(searchString: string, sortName: string, sortOrder: string, page: number) {
    const searchUrl = `${this.baseUrl}search/users?q=${searchString}&sort=${sortName}&order=${sortOrder}&page=${page}&per_page=20`;
    return this.http.get<SearchResponse>(searchUrl).pipe(
      map(res => {
        return {
          items: res.items,
          total: res.total_count
        };
      })
    );
  }
}
