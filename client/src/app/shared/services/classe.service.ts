import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { Classe } from '../models/classe.model';
import { map } from 'rxjs/operators/map';

@Injectable()
export class ClassesService {
  constructor (
    private apiService: ApiService
  ) {}

  // C
  // Create a new Class
  add(classe): Observable<Classe>  {
    return this.apiService.post('/classe/', classe);
  }

  // R
  // Get all the Classes
  get(slug) {
    return this.apiService.get('/classes')
  }

  // U
  // Update a Class
  save(classe): Observable<Classe> {
    // If we're updating an existing article
    let id = classe._id;

    if (classe) {
      return this.apiService.put(`/classe/${id}`, classe);
    }
  }

  // D
  // Delete a Class
  destroy(id) {
    return this.apiService.delete('/classe/' + id);
  }

}
