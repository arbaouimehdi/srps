import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../shared/services/user.service';
import { SubjectsService } from '../../shared/services/subject.service';
import { Subject } from '../../shared/models/subject.model';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class SubjectResolver implements Resolve<Subject> {
  constructor(
    private subjectsService: SubjectsService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.subjectsService.get('/api/subjects');
  }
}
