export interface User {
  id?: number;
  username: string;
  displayName: string;
  password: string;
  enabled: boolean;
  currentAmount: number;
  userPortfolios: any[];
}
