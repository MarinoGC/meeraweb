import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { EXTRA_NAV } from './reducers/extra.reducer';
import { VERSIE } from './reducers/versie.reducer';
import { WERK_ADD, WERK_ALL, WERK_CLEAR } from './reducers/werk.reducer';
import { DATA_ADD, DATA_ALL, DATA_CLEAR } from './reducers/data.reducer';
import { NavItems, ItemType } from './models/nav.model';
import { SizeService } from './services/size.service';
import { HttpService } from './services/http.service';
import { DataService } from './services/data.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ SizeService, HttpService, DataService ],
    encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {

    private cross: boolean = false;
    private breedte: number;
    private overgang = 961;
    private large = true;
    private dataSel: boolean[];
    private items: ItemType[];
    private pageNu: number = 0;
    private n: number;
    private werkPlus: any[];
    private first: boolean = true;
    private versie: number = 0;

    SWIPE_ACTION = {LEFT: 'swipeleft', RIGHT: 'swiperight'};

    werkmd: any;
    datamd: any;
    extraNav: any;
    versieTaal: any;

    constructor(private store: Store<any>,
                private sizeService: SizeService,
                private httpService: HttpService,
                private dataService: DataService) {

//        this.extraNav = store.select('extraNav');
        this.datamd = store.select('datamd');
        this.versieTaal = store.select('versieTaal');
    }

//_________________________________________________________menu navigatie
    onNavigate(value) {
        this.dataSel = value.data['vis'];
        this.pageNu = value.id;
        this.cross = false;
        this.store.dispatch({type: EXTRA_NAV, payload: this.pageNu});
    }

    toggle() {
        this.cross = !this.cross;
    }

    onLang() {
        if (this.versie == 0) {
            this.versie = 1;
        } else {
            this.versie = 0;
        }
        this.store.dispatch({type: VERSIE, payload: this.versie});
    }
//___________________________________________________swipe for iPhone / iPad_____________
    swipe(action = this.SWIPE_ACTION.RIGHT) {
        if (action === this.SWIPE_ACTION.LEFT) {
            this.pageNu++;
            this.n = this.items.length - 1;
            if (this.pageNu > this.n) {this.pageNu = this.n;}
        }
        if (action === this.SWIPE_ACTION.RIGHT) {
            this.pageNu--;
            if (this.pageNu < 0 ) {this.pageNu = 0;}
        }
        this.dataSel = this.items[this.pageNu].data['vis'];
        this.store.dispatch({type: EXTRA_NAV, payload: this.pageNu});
    }
//___________________________________________________________________________________
    ngOnInit() {
        this.items = NavItems;
        this.dataSel = this.items[0].data['vis'];
        this.werkmd = this.dataService.initieerStore('TEST');
        this.store.dispatch({type: WERK_CLEAR});
        for (this.n = 0; this.n < this.werkmd.length; this.n++) {
            this.store.dispatch({type: WERK_ADD, payload: this.werkmd[this.n]});
        }
//__________________________________________________de breedte van het display bepalen
        this.sizeService.width$
            .subscribe(
                data => {
                    this.breedte = (data);
                    this.large = (this.breedte > this.overgang);
                }
            );
//_____________het laatste pad inlezen_________________________________________________
/*
        this.extraNav
            .subscribe(
                data => {
                    this.pageNu = data[0];
                    console.log(this.pageNu);
                    if ((this.pageNu > 0) && (this.pageNu < this.items.length)) {
                        this.dataSel = this.items[this.pageNu].data['vis'];
                    } else {
                        this.dataSel = this.items[0].data['vis'];
                    }
//                    console.log(this.dataSel);
                }
            );
*/
//_____________de gegevens inlezen over de taal versie_________________________________
        this.versieTaal
            .subscribe(
                data => {
                    this.versie = parseInt(data);
                }
            );
//_____________de gegevens inlezen over de werk structuur__________________________________
        this.httpService.readDatas('./data/WerkInfo.md')
            .subscribe(res => {
                this.werkmd =  res;
                console.log('________werk');
                console.log(this.werkmd);
                this.store.dispatch({type: WERK_CLEAR});
                for (this.n = 0; this.n < this.werkmd.length; this.n++) {
                    this.werkPlus = this.dataService.addSecurity(this.werkmd[this.n]);
                    this.store.dispatch({type: WERK_ADD, payload: this.werkPlus});
                }
            });
//_____________de gegevens inlezen over de data structuur__________________________________
        this.httpService.readDatas('./data/DataInfo.md')
            .subscribe(res => {
                this.datamd = res;
                console.log('________data');
                console.log(this.datamd);
                this.store.dispatch({type: DATA_CLEAR});
                for (this.n = 0; this.n < this.datamd.length; this.n++) {
                    this.store.dispatch({type: DATA_ADD, payload: this.datamd[this.n]});
                }
            });
//___________________________________________________________________________________
    }
}

