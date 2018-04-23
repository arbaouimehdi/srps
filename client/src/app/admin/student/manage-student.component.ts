import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';

@Component({
  selector: 'app-manage-student',
  templateUrl: './manage-student.component.html',
  styleUrls: ['./manage-student.component.scss']
})
export class ManageStudentComponent implements OnInit {

  displayedColumns = [
    'position',
    'studentName',
    'rollId',
    'classId',
    'registrationDate',
    'status',
    '_id'
  ];

  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}

export interface Element {
  position: number;
  studentName: string;
  rollId: number;
  classId: number;
  registrationDate: string;
  status: number;
  _id: number;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, studentName: 'Ashish Shrivastav', rollId: 2147, classId: 75, registrationDate:'2018-02-25 12:11:12', status: 1, _id: 12}
];
