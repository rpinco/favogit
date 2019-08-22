import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../store/users';
import { map } from 'rxjs/operators';


export interface GitResponse {
  incomplete_results: boolean;
  items: User[];
  total_count: number;
}

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private baseUrl = 'https://api.github.com/';

  constructor(private http: HttpClient) {

   }


  public getUsers(search) {
    return this.http.get<GitResponse>(`${this.baseUrl}search/users?q=${search}`).pipe(
      map(res => {
        return res.items;
      })
    );

  }

}
