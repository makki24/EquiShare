import { Injectable } from '@angular/core';
import {BASE_API_URL} from "../../../constants/api.constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class DashboardService {
  baseUrl = BASE_API_URL;

  constructor(private http: HttpClient) { }

  getPortfolios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/portfolios/list`)
  }
}
