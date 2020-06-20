import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Group} from '../models/group';
import {Observable} from 'rxjs';

const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  allGroups: Group[];
  mockUrl = 'http://localhost:3000/Groups';
  currentGroup: Group = {
    groupName: '',
    id: null
  };

  getAllGroups() {
    return this.http.get<Group[]>(this.mockUrl, headerOption).subscribe(
      (data: Group[]) => {
        this.allGroups = data;
        console.log(this.allGroups);
      });
  }
  deleteGroup(id: number): Observable<Group> {
    return this.http.delete<Group>(this.mockUrl + '/' + id, headerOption);
  }

  createGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(this.mockUrl, group, headerOption);
  }

  edit(group: Group): Observable<Group> {
    return this.http.put<Group>(this.mockUrl + '/' + group.id, group, headerOption);
  }
}
