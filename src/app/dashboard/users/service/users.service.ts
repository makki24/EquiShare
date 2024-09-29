import { Injectable } from '@angular/core';
import {BASE_API_URL} from "../../../../constants/api.constants";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../../../shared/users/user.model";

@Injectable()
export class UsersService {
  baseUrl = BASE_API_URL;
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users/list`)
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/users/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users/createUser`, user);
  }

}
