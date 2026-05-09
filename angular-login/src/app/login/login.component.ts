import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  loginSuccess: boolean = false;

  onLogin(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Simulate login API call
    setTimeout(() => {
      this.isLoading = false;
      if (this.username === 'admin' && this.password === 'admin123') {
        this.loginSuccess = true;
        this.errorMessage = '';
      } else {
        this.errorMessage = 'Invalid username or password';
      }
    }, 1500);
  }

  onReset(): void {
    this.username = '';
    this.password = '';
    this.errorMessage = '';
    this.loginSuccess = false;
  }
}
