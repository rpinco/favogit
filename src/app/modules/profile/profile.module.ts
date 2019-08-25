import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ProfileModule { }
