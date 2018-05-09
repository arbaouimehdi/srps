import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-detail-results',
  templateUrl: './detail-results.component.html',
  styleUrls: ['./detail-results.component.scss']
})
export class DetailResultsComponent implements OnInit {

  @Input() childMessage: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  /**
   *
   * Init
   *
   */
  ngOnInit() {

  }

}
