import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';
const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  mockUrl = 'http://localhost:3000/Users';
  allUsers: User[];
  currentUser: User = {
    id: null,
    password: '',
    role: '',
    username: ''
  };
  constructor(private http: HttpClient) { }

  delete(id: number) {
    return this.http.delete(`http://localhost:4000/users/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.mockUrl, user, headerOption);
  }

  getAllUsers() {
    return this.http.get<User[]>(this.mockUrl, headerOption).subscribe(
      (data: User[]) => {
        this.allUsers = data;
      });
  }
}
