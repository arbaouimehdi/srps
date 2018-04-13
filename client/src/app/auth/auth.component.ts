import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    this.document.body.classList.add('auth');
  }

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });


  submit() {

  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }


}
