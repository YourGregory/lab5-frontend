import { Component } from '@angular/core';
import usersData from '../assets/db.json';
import {User} from './models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'angularApp';
  currentUser: User;
  role: string;

  constructor(
    private router: Router
  ) {
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
