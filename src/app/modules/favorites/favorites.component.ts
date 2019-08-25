import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FavoriteState, getFavoritesAction, Favorite } from 'src/app/shared/store/favorites-store/favorites.reducer';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favorite$: Observable<FavoriteState>;
  FavoriteSubscription: Subscription;
  favoritesList: Favorite[];


  constructor(private favoriteStore: Store<FavoriteState>) {
    this.favorite$ = this.favoriteStore.select('favorites');

  }

  ngOnInit() {

    this.favorite$.subscribe(
      response => {
        this.favoritesList = response.favoriteList;
      }
    );

    this.favoriteStore.dispatch(getFavoritesAction());
  }

}
