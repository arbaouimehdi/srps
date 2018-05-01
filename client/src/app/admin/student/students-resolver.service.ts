import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../shared/services/user.service';
import { StudentsService } from '../../shared/services/student.service';
import { Student } from '../../shared/models/student.model';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class StudentResolver implements Resolve<Student> {
  constructor(
    private studentsService: StudentsService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.studentsService.get('/api/students');
  }
}
