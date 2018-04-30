import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../shared/services/user.service';
import { ClassesService } from '../../shared/services/class.service';
import { Class } from '../../shared/models/class.model';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class SubjectResolver implements Resolve<Class> {
  constructor(
    private classesService: ClassesService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.classesService.get('/api/classess');
  }
}
