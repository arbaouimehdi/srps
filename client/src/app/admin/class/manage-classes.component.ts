import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';

@Component({
  selector: 'app-manage-classes',
  templateUrl: './manage-classes.component.html',
  styleUrls: ['./manage-classes.component.scss']
})
export class ManageClassesComponent implements OnInit {

  displayedColumns = ['position', 'className', 'classNameNumeric', 'section', '_id'];
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
  className: string;
  classNameNumeric: number;
  section: string;
  position: number;
  _id: number;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, className: 'One', classNameNumeric: 4, section: 'A', _id: 24},
  {position: 1, className: 'One', classNameNumeric: 4, section: 'A', _id: 24},
  {position: 1, className: 'One', classNameNumeric: 4, section: 'A', _id: 24},
  {position: 1, className: 'One', classNameNumeric: 4, section: 'A', _id: 24},
];
