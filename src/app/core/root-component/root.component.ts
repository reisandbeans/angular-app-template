import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {
    platform: string;

    constructor(@Inject(PLATFORM_ID) private platformId: object) {
        this.platform = isPlatformBrowser(this.platformId) ? 'Browser' : 'Server';
        console.log('<<<<< Platform', this.platform, '>>>>>');
    }

    ngOnInit() {}
}
