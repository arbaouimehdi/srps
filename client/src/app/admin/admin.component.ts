import { OverlayContainer } from '@angular/cdk/overlay';
import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../shared';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  mobileQuery: MediaQueryList;
  currentUrl: String;

  private _mobileQueryListener: () => void;

  /**
   * Constructor
   *
   * @param _element
   * @param _overlayContainer
   * @param router
   * @param changeDetectorRef
   * @param media
   */
  constructor(
    private _element: ElementRef,
    private _overlayContainer: OverlayContainer,
    private router:Router,
    private userService: UserService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
  }

  isAuthenticated: boolean;

  /**
   *
   * Init
   *
   */
  ngOnInit() {
    this.currentUrl = this.router.url;
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;

        // set the article list accordingly
        if (authenticated) {
          this.setListTo('admin/dashboard');
        } else {
          this.setListTo('admin');
        }
      }
    );
  }

  /**
   *
   * Toggle Full Screen
   *
   */
  toggleFullscreen() {
    let elem = this._element.nativeElement.querySelector('.app-admin');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullScreen) {
      elem.webkitRequestFullScreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.msRequestFullScreen) {
      elem.msRequestFullScreen();
    }
  }

  /**
   * Get Current URL
   *
   * @param router
   */
  getCurrentUrl(router) {
    return this.currentUrl.includes(router);
  }

  /**
   *
   *
   *
   */
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  /**
   * Set List To
   *
   * @param type
   * @param filters
   */
  setListTo(type: string = '', filters: Object = {}) {
    // If admin is requested but user is not authenticated, redirect to login
    if (type === 'admin' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }
  }

}
