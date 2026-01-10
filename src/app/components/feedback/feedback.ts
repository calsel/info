import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback.html',
  styleUrls: ['./feedback.css']
})
export class Feedback {
  name = '';
  email = '';
  message = '';
  submitted = false;

  private validateEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }

  submit() {
    this.submitted = false;
    const errors: string[] = [];
    if (!this.name.trim()) errors.push('name');
    if (!this.email.trim() || !this.validateEmail(this.email)) errors.push('email');
    if (!this.message.trim()) errors.push('message');

    if (errors.length === 0) {
      console.log('Feedback submitted', { name: this.name, email: this.email, message: this.message });
      this.submitted = true;
      this.name = '';
      this.email = '';
      this.message = '';
    }
  }
}
