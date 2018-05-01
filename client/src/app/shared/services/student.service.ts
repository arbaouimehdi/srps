import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { Student } from '../models/student.model';
import { map } from 'rxjs/operators/map';

@Injectable()
export class StudentsService {
  constructor (
    private apiService: ApiService
  ) {}

  // C
  // Create a new Student
  add(student): Observable<Student>  {
    return this.apiService.post('/student', student);
  }

  // R
  // Get all the Students
  get(slug): Observable<Student> {
    return this.apiService.get('/students')
  }

  // U
  // Update a Student
  save(student): Observable<Student> {
    // If we're updating an existing article
    let id = student._id;

    if (student) {
      return this.apiService.put(`/student/${id}`, student);
    }
  }

  // D
  // Delete a Student
  destroy(id) {
    return this.apiService.delete('/student/' + id);
  }

}
