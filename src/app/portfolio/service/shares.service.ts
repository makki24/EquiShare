import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BASE_API_URL} from "../../../constants/api.constants";

@Injectable()
export class SharesService {
  baseUrl = BASE_API_URL;


  constructor(private http: HttpClient) { }

  searchShares(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/shares/search?query=${query}`);
  }

  sellShares(portfolioId, shareId, sellprice, sellqty, charges) {
    return this.http.post<string>(`${this.baseUrl}/shares/${shareId}/sell-share`, {}, {
      params: {
        sellingPrice: sellprice,
        qty: sellqty,
        portfolioId: portfolioId,
        charges: charges,
      }
    });
  }

  updateShareQty(portfolioId, shareId: number,amount, qty: number, ): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/shares/update-share-qty-and-buying-price`, {},
      {params: {shareId, qty, amountToUpdate: amount, portfolioId: portfolioId,}});
  }

  updateSharePrice(shareId: number, amount): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/shares/update-share-price`, {}, {params: {shareId, amountToUpdate: amount}});
  }
}
