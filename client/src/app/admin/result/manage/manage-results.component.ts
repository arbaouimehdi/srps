import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash'

// Models
import { Result } from '../../../shared/models/result.model';

@Component({
  selector: 'app-manage-results',
  templateUrl: './manage-results.component.html',
  styleUrls: ['./manage-results.component.scss']
})
export class ManageResultsComponent implements OnInit {

  dataSource;
  results;
  updatedResults;
  classes;
  students;
  displayedColumns = [
    'student',
    'roll_id',
    'classe',
    'total_marks',
    'marks_percentage',
    '_id'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    // Retreive the prefetched Students
    this.route.data.subscribe(
      (data) => {
        this.results = data.result.results;
        this.classes = data.classe.classes;
        this.students = data.student.students;
      }
    );

    // Remove Duplicated Keys
    this.updatedResults = this.getGrouppedValues(this.results);
    console.log(this.updatedResults);
    this.dataSource = new MatTableDataSource<Element>(this.updatedResults);

  }

  /**
   * Get Grouped Values
   *
   *
   * @param results
   */
  getGrouppedValues(results) {

    let data = _(results)
    .groupBy('student')
    .map(function(items, index, self) {
      return _(items).groupBy('classe').values().value()
    })
    .map(function(items, index, self) {
      return items;
    })
    .flatten()
    .map(function(items, index, self) {
      self[index].push({
        '_id': self[index][0].classe,
        'classe': self[index][0].classe,
        'student': self[index][0].student,
        'total_marks': _.sumBy(items, 'score'),
        'size': _.size(items) * 100,
      })
      return items;
    })
    .map(function(items, index, self) {
      let last_index = _.findLastIndex(self[index]);
      let results = {
        'infos': [],
        'subjects': []
      };

      results.infos = self[index][last_index];items
      items.splice(-1,1)
      results.subjects = items;

      return results
    })
    .value()

    return data;
  }

  /**
   * Total Marks Percentage
   *
   *
   * @param total_marks
   */
  marksPercentage(size, total_marks) {
    return (total_marks / size) * 100
  }

  /**
   *
   * Pagniator & Sort
   *
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Table Filter
   *
   *
   * @param filterValue
   */
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  /**
   * Get Gender Type
   *
   *
   * @param id
   */
  getClass(id) {
    let classes = this.classes;
    let classe_index = classes.findIndex(obj => obj._id === id);

    let section = classes[classe_index].section;
    let name_text = classes[classe_index].name_text;

    return `${name_text}(${section})`
  }

  /**
   * Get Gender Type
   *
   *
   * @param id
   */
  getStudent(id) {
    let students = this.students;
    let student_index = students.findIndex(obj => obj._id === id);

    return students[student_index]
  }

}
