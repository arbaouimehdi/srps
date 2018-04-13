import {OverlayContainer} from '@angular/cdk/overlay';
import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'dashboard-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.scss']
})

export class HeaderComponent {

  constructor(
    private _element: ElementRef,
    private _overlayContainer: OverlayContainer) {}

  toggleFullscreen() {
    let elem = this._element.nativeElement.parentNode.parentNode.querySelector('.app-admin');
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

}
