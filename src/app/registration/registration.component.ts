import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {UserService} from '../_services/user.service';
import {GroupService} from '../services/group.service';
import {TeacherService} from '../services/teacher.service';
import {StudentService} from '../services/student.service';
import {User} from '../models/user';
import {Student} from '../models/student';
import {Teacher} from '../models/teacher';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  isStudent: boolean;
  selected: string;
  group: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private groupService: GroupService,
    private teacherService: TeacherService,
    private studentSerivce: StudentService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      role: ['', Validators.required]
    });
    this.getAllGroups();
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  selectInput(event) {
    this.selected = event.target.value;
    this.isStudent = this.selected === 'student';
  }

  getAllGroups() {
    this.groupService.getAllGroups();
  }

  createUser(name: string, password: string, firstname: string, lastName: string) {
    const fullname = firstname + ' ' + lastName;
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    const user = new User();
    user.username = name;
    user.password = password;
    user.role = this.selected;
    this.userService.createUser(user).subscribe(
      (result: User) => {
        this.clear();
      });
    if (this.isStudent) {
      const student = new Student();
      student.fullName = fullname;
      student.username = name;
      student.password = password;
      student.group = this.group;
      this.studentSerivce.create(student).subscribe(
        (result: Student) => {
          this.router.navigate(['/login']);
        });
    } else {
      const teacher = new Teacher();
      teacher.username = name;
      teacher.fullName = fullname;
      teacher.password = password;
      this.teacherService.createTeacher(teacher).subscribe(
        (result: Teacher) => {
          this.router.navigate(['/login']);
        });
    }
  }

  setGroup(group: string) {
    console.log(group);
    this.group = group;
  }

  clear() {
    this.userService.currentUser = {
      id: null,
      username: '',
      password: '',
      role: '',
    };
  }
}
