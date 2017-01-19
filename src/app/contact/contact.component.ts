import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ContactComponent implements OnInit {

    werkmd;
    versieTaal;

    private localPage: any;
    private localPageN: number;
    private versie: number = 0;

    constructor(private store: Store<any>) {
        store.select('werkmd')
            .subscribe(werkmd => {
                this.werkmd = werkmd;
            })
        store.select('versieTaal')
            .subscribe(versieTaal =>{
                this.versieTaal = versieTaal;
                this.versie = parseInt(this.versieTaal);
            })
    }
    
    ngOnInit() {
        this.localPageN = 3;
        this.localPage = this.werkmd[this.localPageN];
    }

}
