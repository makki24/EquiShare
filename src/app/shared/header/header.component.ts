import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../../auth/service/auth.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  username: string = '';
  isAuthenticated: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();
  userDetails


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Assuming the username is stored in authService or a similar service
    this.authService.getLoggedInUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: value => {
          this.userDetails = value;
          this.username = this.userDetails.username;
        }
      })

    this.authService.isAuthenticated()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: value => {
          this.isAuthenticated = value;
        }
      })

  }

  logout(): void {
    this.authService.logout(); // Clear authentication token/session
    this.router.navigate(['/auth/login']); // Redirect to login page
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
