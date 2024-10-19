import {Portfolio} from "../shared/portfolio/portfolio.model";
import {User} from "../shared/users/user.model";

export interface AmountTransaction {
  id: number;
  amount: number;
  date: Date
  description: string;
  updatedPortfolioAmount: number;
  portfolio: Portfolio;
  user: User;
  addTransaction: boolean;
  updatedPortfolioCharge: number;
}

export interface PortfolioTransaction extends AmountTransaction{
  shareTransaction?: string;
  sharePrice?: number;
  quantity?: number;
  shareTransactionCharge?: number
}

export interface UserTransaction extends AmountTransaction{
  updatedUserAmount: number;
}
