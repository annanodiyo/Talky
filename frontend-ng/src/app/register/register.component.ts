import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { userDetails } from '../interfaces/userInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm!: FormGroup
  buttonClicked: boolean = false
  showSuccess: boolean = false
  hide: boolean = false

  constructor( private authService: AuthService, private formBuilder: FormBuilder, private router:Router){
    this.registerForm = formBuilder.group({
      email: ['', [Validators.required]],
      full_name : ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  onSuccess(){
    this.showSuccess= true
     setTimeout(() => {
       this.showSuccess = false;
       this.router.navigate(['/']);
     }, 1500);
  }
  registerUser(){
    this.buttonClicked = true
    if (this.registerForm.valid){
      let registeredUser: userDetails = this.registerForm.value

      this.authService.registerUser(registeredUser)
      this.onSuccess()
      console.log('user registered successfully',registeredUser);

    }else{
      console.log('form is invalid fill all required fields');

    }
  }
}
