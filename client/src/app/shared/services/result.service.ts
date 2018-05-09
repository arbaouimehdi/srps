import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { ApiService } from './api.service';
import { Result } from '../models/result.model';
import { HttpModule} from "@angular/http";

@Injectable()
export class ResultsService {
  constructor (
    private apiService: ApiService
  ) {}

  // C
  // Create a new Result
  add(result): Observable<Result>  {
    return this.apiService.post('/result', result);
  }

  // R
  // Get all the Results
  get(slug): Observable<Result> {
    return this.apiService.get('/results')
  }

  // U
  // Update a Result
  save(result): Observable<Result> {
    // If we're updating an existing article
    let id = result._id;

    if (result) {
      return this.apiService.put(`/result/${id}`, result);
    }
  }

  // D
  // Delete a Result
  destroy(id) {
    return this.apiService.delete('/result/' + id);
  }

  // F
  // Find Student Result
  find(student, classe) {
    return this.apiService.get(`/results/${student}/${classe}/all`);
  }

}
