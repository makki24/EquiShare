// dashboard.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  portfolios = [
    { id: 1, name: 'Tech Portfolio', totalValue: 50000 },
    { id: 2, name: 'Health Portfolio', totalValue: 75000 }
  ];

  users = [
    { username: 'john_doe', displayName: 'John Doe', currentAmount: 15000 },
    { username: 'jane_doe', displayName: 'Jane Doe', currentAmount: 30000 }
  ];

  addPortfolio() {
    // Logic to add a new portfolio
    console.log('Add Portfolio button clicked');
    this.portfolios.push({ id: 2, name: 'Health Portfolio', totalValue: 75000 });
  }

  addUser() {
    // Logic to add a new user
    console.log('Add User button clicked');
    this.users.push({ username: 'jane_doe', displayName: 'Jane Doe', currentAmount: 30000 })
  }
}
