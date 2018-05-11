import {Component, Inject} from '@angular/core';

import { PdfRow } from '../template/pdf-row';
import { pdfData } from '../template/pdf-data';

@Component({
  selector: 'app-pdf-dialog',
  templateUrl: './pdf-dialog.component.html',
  styleUrls: ['./pdf-dialog.component.scss']
})

export class PdfDialogComponent {

  public data: PdfRow[] = pdfData;

}
