import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesComponent } from './favorites.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';

@NgModule({
  declarations: [FavoritesComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class FavoritesModule { }
