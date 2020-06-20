import { Component, OnInit } from '@angular/core';
import {TeacherService} from '../services/teacher.service';
import {Teacher} from '../models/teacher';
import {UserService} from '../_services/user.service';
import {User} from '../models/user';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  role: string;

  constructor(private teacherService: TeacherService,
              private userSerivce: UserService) { }

  ngOnInit() {
    this.getAll();
    this.role = localStorage.getItem('role');
  }

  getAll() {
    this.teacherService.getAllTeachers();
  }

  delete(id: string) {
    this.teacherService.deleteTeacher(Number(id)).subscribe(
      (data) => {
        this.getAll();
      }
    );
  }

  edit(entity: Teacher) {
    this.teacherService.currentTeacher = Object.assign({}, entity);
  }

  update(entity: Teacher) {
    this.teacherService.edit(entity).subscribe(
      (result: Teacher) => {
        this.teacherService.getAllTeachers();
        this.clear();
      });
  }

  create(teacher: Teacher) {
    this.teacherService.createTeacher(teacher).subscribe(
      (result: Teacher) => {
        this.teacherService.getAllTeachers();
        this.clear();
      });
    const user = new User();
    user.username = teacher.username;
    user.password = teacher.password;
    user.role = 'role';
    this.userSerivce.createUser(user).subscribe(
      (result: User) => {});
  }

  clear() {
    this.teacherService.currentTeacher = {
      id: null,
      fullName: '',
      password: '',
      username: ''
    };
  }
}
