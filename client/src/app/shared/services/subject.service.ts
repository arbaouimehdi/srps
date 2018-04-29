import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { Subject } from '../models/subject.model';
import { map } from 'rxjs/operators/map';

@Injectable()
export class SubjectsService {
  constructor (
    private apiService: ApiService
  ) {}

  // C
  // Create a new Subject
  add(subject): Observable<Subject>  {
    return this.apiService.post('/subject', subject);
  }

  // R
  // Get all the Subjects
  get(slug): Observable<Subject> {
    return this.apiService.get('/subjects')
  }

  // U
  // Update a Subject
  save(subject): Observable<Subject> {
    // If we're updating an existing article
    let id = subject._id;

    if (subject) {
      return this.apiService.put(`/subject/${id}`, subject);
    }
  }

  // D
  // Delete a Subject
  destroy(id) {
    return this.apiService.delete('/subject/' + id);
  }

}
