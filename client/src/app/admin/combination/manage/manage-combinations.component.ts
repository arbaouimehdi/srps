import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

// Components
import { DeleteDialogComponent } from '../../../shared/dialogs/delete/delete.dialog.component';
import { EditCombinationComponent } from '../edit/edit-combination.component';

// Models
import { Combination } from '../../../shared/models/combination.model';
import { Classe } from '../../../shared/models/classe.model';
import { Subject } from '../../../shared/models/subject.model';

// Services
import { CombinationsService } from '../../../shared/services/combination.service';

// Resolvers
import { CombinationResolver } from '../combinations-resolver.service';
import { ApiService } from '../../../shared';

@Component({
  selector: 'app-manage-combinations',
  templateUrl: './manage-combinations.component.html',
  styleUrls: ['./manage-combinations.component.scss']
})
export class ManageCombinationsComponent implements OnInit {

  combinations: Combination;
  classes;
  subjects;
  dataSource;

  displayedColumns = [
    'subject',
    'class',
    'status',
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
   * @param combinationsService
   * @param apiService
   * @param router
   * @param dialog
   */
  constructor(
    private route: ActivatedRoute,
    private combinationsService: CombinationsService,
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
        this.dataSource = new MatTableDataSource<Element>(data.combination.combinations);
        this.classes = data.classe.classes;
        this.subjects = data.subject.subjects;
      }
    );

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
   * Refresh Table
   *
   *
   * @param combinations
   */
  refreshTable(combinations, id) {

    // Get the index of the data to remove
    let index = combinations.findIndex(obj => obj._id === id);

    // Remove the selected data
    combinations.splice(index, 1);

    // Update the List with the new data
    this.dataSource = new MatTableDataSource<Element>(combinations);

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
      data: {route: 'combination', id }
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
  updateItem(id, status, subject, classe) {
    const route = 'combination';
    const dialogRef = this.dialog.open(EditCombinationComponent, {
      data: { route: `${route}`, id, status, subject, classe }
    });

    //
    // After Closed Dialog
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1 ){
        let combinations = this.dataSource._data.value;
        let index = combinations.findIndex(obj => obj._id === id);

        let updated_combination = this.apiService.get(`/${route}/${id}`).subscribe((data) => {
          combinations[index] = data.combination;
          this.dataSource = new MatTableDataSource<Element>(combinations);
        });

      }
    });

  }

  /**
   * Update Status
   *
   *
   * @param id
   * @param status
   */
  updateStatus(id, status) {

    const route = 'combination';
    let combinations = this.dataSource._data.value;
    let index = combinations.findIndex(obj => obj._id === id);
    let combination = combinations[index];
    combination.status = !status;

    this.apiService.put(`/combination/${id}`, combination).subscribe((data) => {
      combinations[index] = data.combination;
      this.dataSource = new MatTableDataSource<Element>(combinations);
    });

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
  getSubject(id) {
    let subjects = this.subjects;
    let subject_index = subjects.findIndex(obj => obj._id === id);

    let subject = subjects[subject_index].name;

    return subject
  }

}
