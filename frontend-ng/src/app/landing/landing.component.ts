import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
  loginForm!: FormGroup;

  constructor(
    private fB: FormBuilder,
    private userAuth: AuthService,
    private userService: UsersService,
    private router: Router
  ) {
    this.loginForm = this.fB.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  errorMessage: string = '';
  username: string = '';
  password: string = '';
  successMessage: string = '';
  loggingIn: boolean = false;
  loggedInState: boolean = false;
  loggedIn = false;
  

  async loginUser() {
    let user_details = this.loginForm.value;

    try {
      let response = await this.userAuth.login(user_details);

      if (response.error) {
        this.loggingIn = false;
        this.errorMessage = response.error;

        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      } else if (response.message) {
        console.log(response.message);

        this.loggedInState = true;
        this.successMessage = response.message;
        this.loggedIn = true;

        // Assuming response contains user data
        let { username, user_id } = response;

        localStorage.setItem('loggedIn', `${this.loggedIn}`);
        localStorage.setItem('username', `${username}`);
        localStorage.setItem('user_id', `${user_id}`);

        setTimeout(() => {
          this.successMessage = '';
          this.loggedInState = false;

          this.router.navigate(['home']);
        }, 3000);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle any other errors during the login process
    }
  }
}
