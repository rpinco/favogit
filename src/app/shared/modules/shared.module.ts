import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
  ],
  imports: [
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgxDatatableModule,
    FontAwesomeModule,
  ]
})
export class SharedModule {
  constructor() {
    library.add(fas);
  }
 }
