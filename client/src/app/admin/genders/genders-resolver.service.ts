import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../shared/services/user.service';
import { GendersService } from '../../shared/services/gender.service';
import { Gender } from '../../shared/models/gender.model';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class GenderResolver implements Resolve<Gender> {
  constructor(
    private gendersService: GendersService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.gendersService.get('/api/genders');
  }
}
