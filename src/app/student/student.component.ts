import { Component, OnInit } from '@angular/core';
import {TeacherService} from '../services/teacher.service';
import {Teacher} from '../models/teacher';
import {StudentService} from '../services/student.service';
import {Student} from '../models/student';
import {GroupService} from '../services/group.service';
import {User} from "../models/user";
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  role: string;

  constructor(private service: StudentService,
              private groupService: GroupService,
              private userService: UserService) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.getAll();
    this.getAllGroups();
    console.log(this.groupService.allGroups);
  }

  getAll() {
    this.service.getAll();
  }

  delete(id: string) {
    this.service.delete(Number(id)).subscribe(
      (data) => {
        this.getAll();
      }
    );
  }

  edit(entity: Student) {
    this.service.currentStudent = Object.assign({}, entity);
  }

  update(entity: Student, group: string) {
    this.service.currentStudent.group = group;
    this.service.edit(entity).subscribe(
      (result: Student) => {
        this.service.getAll();
        this.clear();
      });
  }

  create(entity: Student, group: string) {
    this.service.currentStudent.group = group;
    this.service.create(entity).subscribe(
      (result: Teacher) => {
        this.service.getAll();
        this.clear();
      });
    let user = new User();
    user.username = entity.username;
    user.password = entity.password;
    user.role = 'student';
    this.userService.createUser(user).subscribe(
      (result: User) => {});
  }

  clear() {
    this.service.currentStudent = {
      id: null,
      fullName: '',
      password: '',
      group: '',
      username: ''
    };
  }

  getAllGroups() {
    this.groupService.getAllGroups();
  }
}
