import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { Class } from '../models/class.model';
import { map } from 'rxjs/operators/map';

@Injectable()
export class ClassesService {
  constructor (
    private apiService: ApiService
  ) {}

  // C
  // Create a new Class
  add(claass): Observable<Class>  {
    return this.apiService.post('/claass', claass);
  }

  // R
  // Get all the Classes
  get(slug): Observable<Class> {
    return this.apiService.get('/classes')
  }

  // U
  // Update a Class
  save(claass): Observable<Class> {
    // If we're updating an existing article
    let id = claass._id;

    if (claass) {
      return this.apiService.put(`/claass/${id}`, claass);
    }
  }

  // D
  // Delete a Class
  destroy(id) {
    return this.apiService.delete('/claass/' + id);
  }

}
