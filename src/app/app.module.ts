import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './shared/components/search-bar/search-bar.component';
import { ProfileModule } from './modules/profile/profile.module';
import { HomeModule } from './modules/home/home.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { SharedModule } from './shared/modules/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { favoriteReducer } from './shared/store/favorites-store/favorites.reducer';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent
  ],
  imports: [
    SharedModule,
    ProfileModule,
    HomeModule,
    FavoritesModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({favorites: favoriteReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
