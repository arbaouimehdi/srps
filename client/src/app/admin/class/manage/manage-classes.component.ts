import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

// Components
import { DeleteDialogComponent } from '../../../shared/dialogs/delete/delete.dialog.component';
import { EditClassComponent } from '../edit/edit-class.component';

// Models
import { Class } from '../../../shared/models/class.model';

// Services
import { ClassesService } from '../../../shared/services/class.service';

// Resolvers
import { ClassResolver } from '../classes-resolver.service';
import { ApiService } from '../../../shared';

@Component({
  selector: 'app-manage-classes',
  templateUrl: './manage-classes.component.html',
  styleUrls: ['./manage-classes.component.scss']
})
export class ManageClassesComponent implements OnInit {

  claass: Class;
  dataSource;
  displayedColumns = [
    'name_text',
    'name_numeric',
    'section',
    'createdAt',
    'updatedAt',
    '_id'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /**
   * Constructor
   *
   *
   * @param route
   * @param classesService
   * @param apiService
   * @param router
   * @param dialog
   */
  constructor(
    private route: ActivatedRoute,
    private classesService: ClassesService,
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
    // Retreive the prefetched Classes
    this.route.data.subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource<Element>(data.claass.classes);
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
   * Refresh Table
   *
   *
   * @param classes
   */
  refreshTable(classes, id) {

    // Get the index of the data to remove
    let index = classes.findIndex(obj => obj._id === id);

    // Remove the selected data
    classes.splice(index, 1);

    // Update the List with the new data
    this.dataSource = new MatTableDataSource<Element>(classes);

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
      data: {route: 'claass', id }
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
  updateItem(id, name_text, name_numeric, section) {
    const dialogRef = this.dialog.open(EditClassComponent, {
      data: { route: 'claass', id, name_text, name_numeric, section }
    });

    //
    // After Closed Dialog
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1 ){
        let classes = this.dataSource._data.value;
        let index = classes.findIndex(obj => obj._id === id);

        let updated_claass = this.apiService.get(`/claass/${id}`).subscribe((data) => {
          classes[index] = data.claass;
          this.dataSource = new MatTableDataSource<Element>(classes);
        });

      }
    });

  }


}

