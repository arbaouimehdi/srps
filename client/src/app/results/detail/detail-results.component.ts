import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

// Services
import { ResultsService } from '../../shared/services/result.service';

@Component({
  selector: 'app-detail-results',
  templateUrl: './detail-results.component.html',
  styleUrls: ['./detail-results.component.scss']
})
export class DetailResultsComponent implements OnInit {

  result;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resultsServices: ResultsService,
  ) {}

  /**
   *
   * Init
   *
   */
  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      console.log(params);

      if (params.roll_id && params.classe) {

        this.resultsServices
          .find(params.roll_id, params.classe)
          .subscribe(
            result => {
              this.result = result;
            },
          )

      }

    });
  }

}
