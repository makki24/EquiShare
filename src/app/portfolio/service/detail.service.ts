import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BASE_API_URL} from "../../../constants/api.constants";
import {Observable} from "rxjs";
import {Portfolio, PortfolioDetailResponse} from "../../shared/portfolio/portfolio.model";

import {User} from "../../shared/users/user.model";
import {PortfolioTransaction, UserTransaction} from "../model";

@Injectable()
export class DetailService{
  baseUrl = BASE_API_URL;
  constructor(private http:HttpClient) { }

  getDetails(id:number): Observable<PortfolioDetailResponse> {
    return this.http.get<PortfolioDetailResponse>(`${this.baseUrl}/portfolios/${id}`);
  }


  getTransactions(id: number, ): Observable<PortfolioTransaction[]> {
    return this.http.get<PortfolioTransaction[]>(`${this.baseUrl}/transaction/${id}/portfoliotransactions`);
  }

  getUserTransactions(id: number, userId: number): Observable<UserTransaction[]> {
    return this.http.get<UserTransaction[]>(`${this.baseUrl}/transaction/${id}/usertransactions`, {params: {userId}});
  }

  buyShares(portfolioId: number, shareAmount: number, qty: number, displayName: string, charges: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/portfolios/${portfolioId}/shares/buy`, {},
      {params: { buyingPrice: shareAmount, qty, displayName, charges }});
  }



  addUserToPortfolio(portfolioId: number, userId: number, contributionAmount: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/portfolios/${portfolioId}/user/add-user`, {}, {params: {
        userId,
        amountToAdd: contributionAmount,
      }});
  }

  withDrawAmount(portfolioId: number, userId: number, amountToWithdraw: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/portfolios/${portfolioId}/user/withdraw-amount`, {}, {params: {
        userId,
        amountToWithdraw: amountToWithdraw,
      }});
  }

  deleteUserFromPortfolio(portfolioId: number, userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/portfolios/${portfolioId}/user/delete-user/${userId}`);
  }

}
