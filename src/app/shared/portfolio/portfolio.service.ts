import {Injectable} from "@angular/core";
import {Portfolio} from "./portfolio.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {BASE_API_URL} from "../../../constants/api.constants";

@Injectable()
export class PortfolioService {
  baseUrl = BASE_API_URL;

  constructor(private http: HttpClient)  {
  }

  createPortfolios(portfolio: Portfolio): Observable<Portfolio> {
    return this.http.post<Portfolio>(`${this.baseUrl}/portfolios/create`, portfolio)
  }
}
