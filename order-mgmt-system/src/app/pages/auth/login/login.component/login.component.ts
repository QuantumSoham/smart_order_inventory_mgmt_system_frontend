import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl:"./login.component.css"
})
export class LoginPage {

  model = {
    credential: '',
    password: ''
  };

  error = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login(form: any) {
    localStorage.clear();
    if (form.invalid) return;

    this.auth.login(this.model).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: () => this.error = 'Invalid credentials'
    });
  }
}
