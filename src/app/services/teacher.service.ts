import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Teacher} from '../models/teacher';
import {Observable} from 'rxjs';

const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }

  allTeachers: Teacher[];
  mockUrl = 'http://localhost:3000/Teachers';
  currentTeacher: Teacher = {
    fullName: '',
    id: null,
    password: '',
    username: ''
  };

  getAllTeachers() {
    return this.http.get<Teacher[]>(this.mockUrl, headerOption).subscribe(
      (data: Teacher[]) => {
        this.allTeachers = data;
      });
  }

  deleteTeacher(id: number): Observable<Teacher> {
    return this.http.delete<Teacher>(this.mockUrl + '/' + id, headerOption);
  }

  createTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(this.mockUrl, teacher, headerOption);
  }

  edit(teacher: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(this.mockUrl + '/' + teacher.id, teacher, headerOption);
  }
}
