import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BASE_API_URL} from "../../../constants/api.constants";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = BASE_API_URL; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/public/login`, { username, password });
  }

  signup(username: string, password: string, displayName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { username, password, displayName });
  }

  forgotPassword(username: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { username });
  }
}
