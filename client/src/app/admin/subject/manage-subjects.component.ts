import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { DeleteDialogComponent } from '../../shared/dialogs/delete/delete.dialog.component';

// Models
import { Subject } from '../../shared/models/subject.model';

// Services
import { SubjectsService } from '../../shared/services/subject.service';

// Resolvers
import { SubjectResolver } from './subjects-resolver.service';

@Component({
  selector: 'app-manage-subjects',
  templateUrl: './manage-subjects.component.html',
  styleUrls: ['./manage-subjects.component.scss']
})
export class ManageSubjectsComponent implements OnInit {

  subject: Subject;
  dataSource;
  displayedColumns = [
    'position',
    'name',
    'code',
    'createdAt',
    '_id'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Constructor
   *
   *
   * @param route
   * @param subjectsService
   * @param router
   */
  constructor(
    private route: ActivatedRoute,
    private subjectsService: SubjectsService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  /**
   *
   *
   * Init
   *
   *
   */
  ngOnInit() {

    // Retreive the prefetched Subjects
    this.route.data.subscribe(
      (data) => {
        this.addPosition(data.subject.subjects);
        this.dataSource = new MatTableDataSource<Element>(data.subject.subjects);
      }
    );
  }

  /**
   *
   * Pagniator
   *
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
   * Add Position Field
   *
   *
   * @param subjects
   */
  addPosition(subjects) {
    let counter = 0;
    for (let subject of subjects) {
      counter += 1;
      subject['position'] = counter
    }
  }

  /**
   * Delete an Item
   *
   *
   * @param id
   * @param route
   */
  deleteItem(id, route) {

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { id, route }
    });

    //
    // After Closed Dialog
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1 ){

        let subjects = this.dataSource._data.value;

        // Get the index of the data to remove
        let index = subjects.findIndex(obj => obj._id === id);

        // Remove the selected data
        subjects.splice(index, 1);

        // Update the List with the new data
        this.dataSource = new MatTableDataSource<Element>(subjects);

        // Update the Pagniation
        this.dataSource.paginator = this.paginator;
      }
    });

  }

}
