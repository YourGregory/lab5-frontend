import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Subject} from '../models/subject';
import {Student} from "../models/student";

const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  allSubjects: Subject[];
  mockUrl = 'http://localhost:3000/Subjects';
  currentSubject: Subject = {
    id: null,
    subjectName: '',
    group: '',
    teacher: ''
  };

  getAll() {
    return this.http.get<Subject[]>(this.mockUrl, headerOption).subscribe(
      (data: Subject[]) => {
        this.allSubjects = data;
      });
  }

  delete(id: number): Observable<Subject> {
    return this.http.delete<Subject>(this.mockUrl + '/' + id, headerOption);
  }

  create(entity: Subject): Observable<Subject> {
    return this.http.post<Subject>(this.mockUrl, entity, headerOption);
  }

  edit(subject: Subject): Observable<Subject> {
    return this.http.put<Subject>(this.mockUrl + '/' + subject.id, subject, headerOption);
  }
}
