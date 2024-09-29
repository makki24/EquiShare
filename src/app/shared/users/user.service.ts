import {Injectable} from "@angular/core";
import {BASE_API_URL} from "../../../constants/api.constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {User} from "./user.model";

@Injectable()
export class UsersService {
  baseUrl = BASE_API_URL;

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users/list`)
  }
}
