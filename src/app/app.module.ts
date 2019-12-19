import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_INITIALIZER } from '@angular/core';


import { AppComponent } from './app.component';
import { RowComponent } from './lists/row/row.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { ListsComponent } from './lists/lists.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AppConfigService } from './_services/app-config.service';
import { WinnersComponent } from './winners/winners.component';
import { MainComponent } from './main/main.component';
import { RuntimeButtonsComponent } from './main/runtime-buttons/runtime-buttons.component';
import { MaterialModule } from './modules/material/material.module';
import { SoundsService } from './_services/sounds.service';
import { FormsModule } from '@angular/forms';
import { WinnerDialogComponent } from './winners/winner-dialog/winner-dialog.component';
import { MatDialogModule } from '@angular/material';

export function initialize(config: AppConfigService, soundService: SoundsService) {
   return () => {
      config.load();
      soundService.load();
   }
}


@NgModule({
   declarations: [
      AppComponent,
      RowComponent,
      ListsComponent,
      WinnersComponent,
      MainComponent,
      RuntimeButtonsComponent,
      WinnerDialogComponent,
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      MatSliderModule,
      NgScrollbarModule,
      MaterialModule,
      FormsModule,
      MatDialogModule
   ],
   entryComponents: [WinnerDialogComponent],
   providers: [
      AppConfigService,
      SoundsService,
      {
         provide: APP_INITIALIZER,
         useFactory: initialize,
         multi: true,
         deps: [SoundsService, AppConfigService]
      }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
