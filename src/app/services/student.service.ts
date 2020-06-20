import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Student} from '../models/student';
import {Observable} from 'rxjs';

const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  allStudents: Student[];
  mockUrl = 'http://localhost:3000/Students';
  currentStudent: Student = {
    id: null,
    fullName: '',
    group: '',
    password: '',
    username: ''
  };

  getAll() {
    return this.http.get<Student[]>(this.mockUrl, headerOption).subscribe(
      (data: Student[]) => {
        this.allStudents = data;
      });
  }

  delete(id: number): Observable<Student> {
    return this.http.delete<Student>(this.mockUrl + '/' + id, headerOption);
  }

  create(student: Student): Observable<Student> {
    return this.http.post<Student>(this.mockUrl, student, headerOption);
  }

  edit(student: Student): Observable<Student> {
    return this.http.put<Student>(this.mockUrl + '/' + student.id, student, headerOption);
  }
}
