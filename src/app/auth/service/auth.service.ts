import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable, Subject, tap} from "rxjs";
import {BASE_API_URL} from "../../../constants/api.constants";
import {User} from "../../dashboard/users/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = BASE_API_URL; // Replace with your actual API URL
  private authDetails = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/public/login`, { username, password })
      .pipe(tap((response: { token: string }) => {
        localStorage.setItem('authToken', response.token);
        this.authDetails.next(true);
      }))
  }

  getLoggedInUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/getLoggedInUser`)
      .pipe(
        tap(loggedInUser => {
          this.authDetails.next(true)
        })
      )
  }

  isAuthenticated(): Subject<boolean> {
    return this.authDetails;
  }

  logout(){
    localStorage.removeItem("authToken");
    this.authDetails.next(false);
  }



  signup(username: string, password: string, displayName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { username, password, displayName });
  }

  forgotPassword(username: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { username });
  }
}
