import { Injectable } from '@angular/core';
import {BASE_API_URL} from "../../../../constants/api.constants";
import {User} from "../user.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UsersService {
  baseUrl = BASE_API_URL;
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users/list`)
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users/createUser`, user);
  }

}
