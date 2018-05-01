import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';

@Component({
  selector: 'app-manage-combinations',
  templateUrl: './manage-combinations.component.html',
  styleUrls: ['./manage-combinations.component.scss']
})
export class ManageCombinationsComponent implements OnInit {

  displayedColumns = [
    'position',
    'classAndSection',
    'subject',
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
  classAndSection: string;
  subject: string;
  status: number;
  _id: number;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, classAndSection: 'One Section-A', subject: "English", status: 0, _id: 1},
  {position: 1, classAndSection: 'One Section-A', subject: "Math", status: 1, _id: 1},
  {position: 1, classAndSection: 'One Section-A', subject: "Computer Science", status: 1, _id: 1},
];
