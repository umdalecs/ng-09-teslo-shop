import { AuthService } from '@/auth/services/auth-service';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'front-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styles: ``
})
export class Navbar {
  protected authService = inject(AuthService);
}
