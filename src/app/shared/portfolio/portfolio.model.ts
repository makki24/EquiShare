export interface Portfolio {
  id?: number;
  displayName: string;
  portfolioCharge: number;
  totalValue: number;
}

export interface PortfolioDetailResponse {
  portfolio: Portfolio;
  shares: ShareTransactions[]
  userPortfolioResponses: UserPortfolioResponse[]
  totalShareValue: number
}

export interface ShareTransactions {
  "id": number,
  "displayName": string,
  "buyingPrice": number,
  "currentPrice": number,
  "qty": number
  percentageChange?: number;
}

export interface UserPortfolioResponse {
  username: string;
  contributionPercentage: number;
  displayName: string
  id: number; //user id
  currentValue: number;
}
