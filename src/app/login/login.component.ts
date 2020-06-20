import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.getAllUsers();
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit(username: string, password: string) {
    this.submitted = true;

    for (let user of this.userService.allUsers) {
      if (username === user.username) {
        if (password === user.password) {
          console.log(user.role);
          localStorage.setItem('role', user.role);
          this.router.navigate(['/students']);
        }
      } else {
        this.error = 'Invalid';
        console.log(this.error);
      }
    }
  }
  getAllUsers() {
    this.userService.getAllUsers();
  }
}
