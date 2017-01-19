import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-paintings',
    templateUrl: './paintings.component.html',
    styleUrls: ['./paintings.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class PaintingsComponent implements OnInit {

    werkmd;

    private localPage: any;
    private localPageN: number;

    constructor(private store: Store<any>) {
        store.select('werkmd')
            .subscribe(werkmd => {
                this.werkmd = werkmd;
            })
    }

    ngOnInit() {
        this.localPageN = 0;
        this.localPage = this.werkmd[this.localPageN];
    }

}
