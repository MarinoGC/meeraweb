import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { StoreModule, combineReducers } from '@ngrx/store'
import { compose } from '@ngrx/core/compose';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from "ngrx-store-localstorage";

import { extraNav } from './reducers/extra.reducer';
import { versieTaal } from './reducers/versie.reducer';
import { werkmd } from './reducers/werk.reducer';
import { datamd } from './reducers/data.reducer';
import { HomeComponent } from './home/home.component';
import { PaintingsComponent } from './paintings/paintings.component';
import { SculpturesComponent } from './sculptures/sculptures.component';
import { TeachingsComponent } from './teachings/teachings.component';
import { BiographyComponent } from './biography/biography.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        PaintingsComponent,
        SculpturesComponent,
        TeachingsComponent,
        BiographyComponent,
        ContactComponent,
     ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        StoreModule.provideStore(
            compose(
                localStorageSync(['extraNav', 'versieTaal'], true),
                combineReducers
            ) ({extraNav, versieTaal, werkmd, datamd})
        ),
        StoreDevtoolsModule.instrumentOnlyWithExtension()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
