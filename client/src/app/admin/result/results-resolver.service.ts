import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../shared/services/user.service';
import { ResultsService } from '../../shared/services/result.service';
import { Result } from '../../shared/models/result.model';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class ResultResolver implements Resolve<Result> {
  constructor(
    private resultsService: ResultsService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.resultsService.get('/api/results');
  }
}
