import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { Role } from '../../../../core/models/role.enum';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterPage {

  roles=Object.values(Role)
  model = {
    username: '',
    email: '',
    password: '',
    role:Role.USER
  };

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  register(form: any) {
    if (form.invalid) return;

    this.auth.register(this.model).subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
