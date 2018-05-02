import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { ApiService } from './api.service';
import { Combination } from '../models/combination.model';
import { HttpModule} from "@angular/http";

@Injectable()
export class CombinationsService {
  constructor (
    private apiService: ApiService
  ) {}

  // C
  // Create a new Combination
  add(combination): Observable<Combination>  {
    return this.apiService.post('/combination', combination);
  }

  // R
  // Get all the Combinations
  get(slug): Observable<Combination> {
    return this.apiService.get('/combinations')
  }

  // U
  // Update a Combination
  save(combination): Observable<Combination> {
    // If we're updating an existing article
    let id = combination._id;

    if (combination) {
      return this.apiService.put(`/combination/${id}`, combination);
    }
  }

  // D
  // Delete a Combination
  destroy(id) {
    return this.apiService.delete('/combination/' + id);
  }

}
