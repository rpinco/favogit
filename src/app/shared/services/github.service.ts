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

  constructor(private http: HttpClient) {}


  public getUsers(search: string) {
    return this.http.get<SearchResponse>(`${this.baseUrl}search/users?q=${search}`).pipe(
      map(res => {
        return res.items;
      })
    );

  }

  public getUser(username: string) {
    return this.http.get<UserResponse>(`${this.baseUrl}users/${username}`);
  }

}
