import { OverlayContainer } from '@angular/cdk/overlay';
import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  mobileQuery: MediaQueryList;
  currentUrl: String;

  private _mobileQueryListener: () => void;

  constructor(
    private _element: ElementRef,
    private _overlayContainer: OverlayContainer,
    private router:Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }

  ngOnInit() {
    this.currentUrl = this.router.url;
  }

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

  getCurrentUrl(router) {
    return this.currentUrl.includes(router);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
