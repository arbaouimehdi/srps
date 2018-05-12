import { Component, Input } from '@angular/core';
import { aggregateBy } from '@progress/kendo-data-query';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pdf-template',
  templateUrl: './pdf-template.component.html',
  styleUrls: ['./pdf-template.component.scss']
})

export class PdfTemplateComponent  {

  @Input() public data;
  today: number = Date.now();

}
