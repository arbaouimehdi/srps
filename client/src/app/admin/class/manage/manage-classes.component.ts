import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';

@Component({
  selector: 'app-manage-classes',
  templateUrl: './manage-classes.component.html',
  styleUrls: ['./manage-classes.component.scss']
})
export class ManageClassesComponent implements OnInit {

  displayedColumns = [
    'position',
    'className',
    'classNameNumeric',
    'section',
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
  className: string;
  classNameNumeric: number;
  section: string;
  creationDate: string;
  _id: number;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, className: 'One', classNameNumeric: 4, section: 'A', creationDate:'2018-02-25 12:11:12', _id: 75},
  {position: 2, className: 'Two', classNameNumeric: 3, section: 'C', creationDate:'2018-02-25 12:11:12', _id: 75},
  {position: 3, className: 'Kit', classNameNumeric: 4, section: 'B', creationDate:'2018-02-25 12:11:12', _id: 63},
  {position: 4, className: 'Four', classNameNumeric: 1, section: 'D', creationDate:'2018-02-25 12:11:12', _id: 47},
  {position: 4, className: 'Four', classNameNumeric: 1, section: 'D', creationDate:'2018-02-25 12:11:12', _id: 47},
  {position: 4, className: 'Four', classNameNumeric: 1, section: 'D', creationDate:'2018-02-25 12:11:12', _id: 47},
  {position: 4, className: 'Four', classNameNumeric: 1, section: 'D', creationDate:'2018-02-25 12:11:12', _id: 47},
  {position: 4, className: 'Four', classNameNumeric: 1, section: 'D', creationDate:'2018-02-25 12:11:12', _id: 47},
  {position: 4, className: 'Four', classNameNumeric: 1, section: 'D', creationDate:'2018-02-25 12:11:12', _id: 47},
  {position: 4, className: 'Four', classNameNumeric: 1, section: 'D', creationDate:'2018-02-25 12:11:12', _id: 47},
  {position: 4, className: 'Four', classNameNumeric: 1, section: 'D', creationDate:'2018-02-25 12:11:12', _id: 47},
  {position: 4, className: 'Four', classNameNumeric: 1, section: 'D', creationDate:'2018-02-25 12:11:12', _id: 47},
  {position: 4, className: 'Four', classNameNumeric: 1, section: 'D', creationDate:'2018-02-25 12:11:12', _id: 47},
  {position: 4, className: 'Four', classNameNumeric: 1, section: 'D', creationDate:'2018-02-25 12:11:12', _id: 47},
  {position: 4, className: 'Four', classNameNumeric: 1, section: 'D', creationDate:'2018-02-25 12:11:12', _id: 47},
  {position: 4, className: 'Four', classNameNumeric: 1, section: 'D', creationDate:'2018-02-25 12:11:12', _id: 47},
  {position: 4, className: 'Four', classNameNumeric: 1, section: 'D', creationDate:'2018-02-25 12:11:12', _id: 47},
  {position: 4, className: 'Four', classNameNumeric: 1, section: 'D', creationDate:'2018-02-25 12:11:12', _id: 47},
];
