import { Component, OnInit } from '@angular/core';
import {GroupService} from '../services/group.service';
import {SubjectService} from '../services/subject.service';
import {TeacherService} from '../services/teacher.service';
import {Subject} from '../models/subject';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  role: string;

  constructor(private service: SubjectService, private groupService: GroupService, private teacherService: TeacherService) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.getAll();
    this.getAllGroups();
    this.getAllTeachers();
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

  edit(entity: Subject) {
    this.service.currentSubject = Object.assign({}, entity);
  }

  update(entity: Subject, group: string, teacher: string) {
    this.service.currentSubject.group = group;
    this.service.currentSubject.teacher = teacher;
    this.service.edit(entity).subscribe(
      (result: Subject) => {
        this.service.getAll();
        this.clear();
      });
  }

  create(entity: Subject, group: string, teacher: string) {
    this.service.currentSubject.group = group;
    this.service.currentSubject.teacher = teacher;
    this.service.create(entity).subscribe(
      (result: Subject) => {
        this.service.getAll();
        this.clear();
      });
  }

  clear() {
    this.service.currentSubject = {
      id: null,
      subjectName: '',
      teacher: '',
      group: ''
    };
  }

  getAllGroups() {
    this.groupService.getAllGroups();
  }

  getAllTeachers() {
    this.teacherService.getAllTeachers();
  }
}
