import { Component, OnInit } from '@angular/core';
import {GroupService} from '../services/group.service';
import {Group} from '../models/group';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  role: string;

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.getAllGroups();
  }
  getAllGroups() {
    this.groupService.getAllGroups();
  }

  deleteGroup(id: string) {
    this.groupService.deleteGroup(Number(id)).subscribe(
      (data) => {
        this.getAllGroups();
      }
    );
  }

  edit(entity: Group) {
    this.groupService.currentGroup = Object.assign({}, entity);
  }

  update(entity: Group) {
    this.groupService.edit(entity).subscribe(
      (result: Group) => {
        this.groupService.getAllGroups();
        this.clearGroup();
      });
  }

  createGroup(group: Group) {
    this.groupService.createGroup(group).subscribe(
      (result: Group) => {
        this.groupService.getAllGroups();
        this.clearGroup();
      });
  }

  clearGroup() {
    this.groupService.currentGroup = {
      id: null,
      groupName: ''
    };
  }
}
