import { Component, OnInit } from '@angular/core';
import {StudentService} from '../services/student.service';
import {TeacherService} from '../services/teacher.service';
import {MarkService} from '../services/mark.service';
import {SubjectService} from '../services/subject.service';
import {Mark} from '../models/mark';

@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.css']
})
export class MarkComponent implements OnInit {

  role: string;

  constructor(private service: MarkService , private studentService: StudentService,
              private teacherService: TeacherService, private subjectService: SubjectService) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.getAll();
    this.getAllSubjects();
    this.getAllStudents();
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

  edit(entity: Mark) {
    this.service.currentMark = Object.assign({}, entity);
  }

  update(entity: Mark, student: string, subject: string, teacher: string) {
    this.service.currentMark.subject = student;
    this.service.currentMark.subject = subject;
    this.service.currentMark.teacher = teacher;
    this.service.edit(entity).subscribe(
      (result: Mark) => {
        this.service.getAll();
        this.clear();
      });
  }

  create(entity: Mark, student: string, subject: string, teacher: string) {
    this.service.currentMark.student = student;
    this.service.currentMark.teacher = teacher;
    this.service.currentMark.subject = subject;
    this.service.create(entity).subscribe(
      (result: Mark) => {
        this.service.getAll();
        this.clear();
      });
  }

  clear() {
    this.service.currentMark = {
      id: null,
      mark: null,
      subject: '',
      student: '',
      teacher: ''
    };
  }

  getAllTeachers() {
    this.teacherService.getAllTeachers();
  }
  getAllStudents() {
    this.studentService.getAll();
  }
  getAllSubjects() {
    this.subjectService.getAll();
  }
}
