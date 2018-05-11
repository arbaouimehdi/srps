import { Component, Input } from '@angular/core';
import { aggregateBy } from '@progress/kendo-data-query';
import { ActivatedRoute } from '@angular/router';

import { PdfRow } from './pdf-row';

@Component({
  selector: 'app-pdf-template',
  templateUrl: './pdf-template.component.html',
  styleUrls: ['./pdf-template.component.scss']
})


export class PdfTemplateComponent  {

  @Input()
  public data: PdfRow[] = [];

  private aggregates: any[] = [{
    field: 'qty', aggregate: 'sum'
  }, {
    field: 'total', aggregate: 'sum'
  }];

  public get totals(): any {
    return aggregateBy(this.data, this.aggregates) || {};
  }

}
