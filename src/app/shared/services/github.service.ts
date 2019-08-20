import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private baseUrl = 'https://api.github.com/';

  constructor(private http: HttpClient) {

   }


  public getUsers(search) {
    return this.http.get(`${this.baseUrl}search/users?q=${search}`);

  }

}
