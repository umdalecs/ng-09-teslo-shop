import { AuthService } from '@/auth/services/auth-service';
import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard-layout',
  imports: [RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './admin-dashboard-layout.html',
  styles: ``
})
export class AdminDashboardLayout {
  private authService = inject(AuthService);
  private router = inject(Router);

  user = computed(()=>this.authService.user());

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
