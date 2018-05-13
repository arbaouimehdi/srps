import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../shared';
import { Errors } from '../shared/models/errors.model';
import { CustomValidators, ConfirmValidParentMatcher, errorMessages, regExps } from './custom-validators';

import * as _ from 'lodash'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authType: String      = '';
  isSubmitting          = false;
  hide                  = true;
  errors                = errorMessages;
  isValid: Boolean      = false;
  authForm: FormGroup;
  backEndErrors: Errors = {errors: {}}

  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {

    this.authForm = this.fb.group({
      emailGroup: this.fb.group({
        'email': ['', [
            Validators.required,
            Validators.email
        ]]
      }, { validator: CustomValidators.childrenEqual}),
      passwordGroup: this.fb.group({
        'password': ['', [
            Validators.required,
            Validators.pattern(regExps.password)
        ]]
      })
    })


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
    password: new FormControl(''),
  });

  /**
   *
   *
   *
   *
   */
  ngOnInit() {
    this.document.body.classList.add('auth');

    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl());
      }
    });
  }
  /**
   *
   *
   *
   *
   */
  submitForm() {

    this.backEndErrors = {errors: {}};


    const credentials = {
      email: this.authForm.value.emailGroup.email,
      password: this.authForm.value.passwordGroup.password,
    }

    console.log(credentials);

    this.userService
    .attemptAuth(this.authType, credentials)
    .subscribe(
      data => {
        this.isValid = false;
        this.router.navigateByUrl('/admin/home')
      },
      err => {
        this.backEndErrors = err;
        this.isValid = true;
      }
    );
  }


}
