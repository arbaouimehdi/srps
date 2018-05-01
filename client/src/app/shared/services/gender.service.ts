import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { Gender } from '../models/gender.model';
import { map } from 'rxjs/operators/map';

@Injectable()
export class GendersService {
  constructor (
    private apiService: ApiService
  ) {}

  // C
  // Create a new Gender
  add(gender): Observable<Gender>  {
    return this.apiService.post('/gender', gender);
  }

  // R
  // Get all the Gender
  get(slug): Observable<Gender> {
    return this.apiService.get('/genders')
  }

  // U
  // Update a Gender
  save(gender): Observable<Gender> {
    // If we're updating an existing article
    let id = gender._id;

    if (gender) {
      return this.apiService.put(`/gender/${id}`, gender);
    }
  }

  // D
  // Delete a Gender
  destroy(id) {
    return this.apiService.delete('/gender/' + id);
  }

}
