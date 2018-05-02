import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../shared/services/user.service';
import { CombinationsService } from '../../shared/services/combination.service';
import { Combination } from '../../shared/models/combination.model';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class CombinationResolver implements Resolve<Combination> {
  constructor(
    private combinationsService: CombinationsService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.combinationsService.get('/api/combinations');
  }
}
