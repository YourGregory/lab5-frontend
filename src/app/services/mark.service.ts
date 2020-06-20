import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Student} from '../models/student';
import {Observable} from 'rxjs';
import {Mark} from '../models/mark';

const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MarkService {

  constructor(private http: HttpClient) { }

  allMarks: Mark[];
  mockUrl = 'http://localhost:3000/Marks';
  currentMark: Mark = {
    id: null,
    mark: null,
    teacher: '',
    student: '',
    subject: ''
  };

  getAll() {
    return this.http.get<Mark[]>(this.mockUrl, headerOption).subscribe(
      (data: Mark[]) => {
        this.allMarks = data;
      });
  }

  delete(id: number): Observable<Mark> {
    return this.http.delete<Mark>(this.mockUrl + '/' + id, headerOption);
  }

  create(mark: Mark): Observable<Mark> {
    return this.http.post<Mark>(this.mockUrl, mark, headerOption);
  }

  edit(mark: Mark): Observable<Mark> {
    return this.http.put<Mark>(this.mockUrl + '/' + mark.id, mark, headerOption);
  }
}
