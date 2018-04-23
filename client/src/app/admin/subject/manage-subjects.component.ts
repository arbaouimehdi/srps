import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';

@Component({
  selector: 'app-manage-subjects',
  templateUrl: './manage-subjects.component.html',
  styleUrls: ['./manage-subjects.component.scss']
})
export class ManageSubjectsComponent implements OnInit {

  displayedColumns = [
    'position',
    'subjectName',
    'subjectCode',
    'creationDate',
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
  subjectName: string;
  subjectCode: number;
  creationDate: string;
  _id: number;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, subjectName: 'English', subjectCode: 6578, creationDate:'2018-02-25 12:11:12', _id: 1},
  {position: 2, subjectName: 'Math', subjectCode: 128, creationDate:'2018-02-25 12:11:12', _id: 2},
];
