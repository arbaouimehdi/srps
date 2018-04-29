import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

// Components
import { DeleteDialogComponent } from '../../shared/dialogs/delete/delete.dialog.component';
import { EditSubjectComponent } from './edit-subject.component';

// Models
import { Subject } from '../../shared/models/subject.model';

// Services
import { SubjectsService } from '../../shared/services/subject.service';

// Resolvers
import { SubjectResolver } from './subjects-resolver.service';
import { ApiService } from '../../shared';

@Component({
  selector: 'app-manage-subjects',
  templateUrl: './manage-subjects.component.html',
  styleUrls: ['./manage-subjects.component.scss']
})
export class ManageSubjectsComponent implements OnInit {

  subject: Subject;
  dataSource;
  displayedColumns = [
    'name',
    'code',
    'createdAt',
    'updatedAt',
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
    private apiService: ApiService,
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
   * Refresh Table
   *
   *
   * @param subjects
   */
  refreshTable(subjects, id) {

    // Get the index of the data to remove
    let index = subjects.findIndex(obj => obj._id === id);

    // Remove the selected data
    subjects.splice(index, 1);

    // Update the List with the new data
    this.dataSource = new MatTableDataSource<Element>(subjects);

    // Update the Pagniation
    this.dataSource.paginator = this.paginator;

  }

  /**
   * Delete an Item
   *
   *
   * @param id
   * @param route
   */
  deleteItem(id) {

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {route: 'subject', id }
    });

    //
    // After Closed Dialog
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1 ){
        this.refreshTable(this.dataSource._data.value, id);
      }
    });

  }

  /**
   * Update an Item
   *
   *
   * @param id
   * @param route
   */
  updateItem(id, name, code) {
    const dialogRef = this.dialog.open(EditSubjectComponent, {
      data: { route: 'subject', id, name, code }
    });

    //
    // After Closed Dialog
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1 ){
        let subjects = this.dataSource._data.value;
        let index = subjects.findIndex(obj => obj._id === id);

        let updated_subject = this.apiService.get(`/subject/${id}`).subscribe((data) => {
          subjects[index] = data.subject;
          console.log(subjects[index]);
          this.dataSource = new MatTableDataSource<Element>(subjects);
        });

      }
    });

  }

}
