import { Injectable } from '@angular/core';
import {BASE_API_URL} from "../../../../constants/api.constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Portfolio} from "../portfolio.model";

@Injectable()
export class PortfolioService {
  baseUrl = BASE_API_URL;

  constructor(private http: HttpClient) { }

  getPortfolios(): Observable<Portfolio[]> {
    return this.http.get<Portfolio[]>(`${this.baseUrl}/portfolios/list`)
  }

  createPortfolios(portfolio: Portfolio): Observable<Portfolio> {
    return this.http.post<Portfolio>(`${this.baseUrl}/portfolios/create`, portfolio)
  }

}
