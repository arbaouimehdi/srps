import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

// Components
import { DeleteDialogComponent } from '../../../shared/dialogs/delete/delete.dialog.component';
import { EditStudentComponent } from '../edit/edit-student.component';

// Models
import { Student } from '../../../shared/models/student.model';

// Services
import { StudentsService } from '../../../shared/services/student.service';
import { GendersService } from '../../../shared/services/gender.service';

// Resolvers
import { StudentResolver } from '../students-resolver.service';
import { ApiService } from '../../../shared';

@Component({
  selector: 'app-manage-student',
  templateUrl: './manage-student.component.html',
  styleUrls: ['./manage-student.component.scss']
})
export class ManageStudentComponent implements OnInit {

  student: Student;
  dataSource;
  genders;
  classes;
  displayedColumns = [
    'full_name',
    'roll_id',
    'birth_date',
    'gender',
    'class',
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
   * @param studentsService
   * @param apiService
   * @param router
   * @param dialog
   */
  constructor(
    private route: ActivatedRoute,
    private studentsService: StudentsService,
    private gendersService: GendersService,
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

    // Retreive the prefetched Students
    this.route.data.subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource<Element>(data.student.students);
        this.genders = data.gender.genders;
        this.classes = data.classe.classes;
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
   * @param students
   */
  refreshTable(students, id) {

    // Get the index of the data to remove
    let index = students.findIndex(obj => obj._id === id);

    // Remove the selected data
    students.splice(index, 1);

    // Update the List with the new data
    this.dataSource = new MatTableDataSource<Element>(students);

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
      data: {route: 'student', id }
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
  updateItem(id, full_name, roll_id, birth_date, gender, classe) {

    const route = 'student';
    const dialogRef = this.dialog.open(EditStudentComponent, {
      data: { route: `${route}`, id, full_name, roll_id, birth_date, gender, classe }
    });

    //
    // After Closed Dialog
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1 ){
        let students = this.dataSource._data.value;
        let index = students.findIndex(obj => obj._id === id);

        let updated_student = this.apiService.get(`/${route}/${id}`).subscribe((data) => {
          students[index] = data.student;
          this.dataSource = new MatTableDataSource<Element>(students);
        });

      }
    });

  }

  /**
   * Get Gender Type
   *
   *
   * @param id
   */
  getGender(id) {
    let genders = this.genders;
    let gender_index = genders.findIndex(obj => obj._id === id)
    return genders[gender_index].type
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

}
