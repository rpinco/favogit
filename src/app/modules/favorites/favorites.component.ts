import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {
  FavoriteState,
  getFavoritesAction,
  Favorite,
  selectAllFavorites,
  removeFavoritesAction
} from 'src/app/shared/store/favorites-store/favorites.reducer';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favorite$: Observable<Favorite[]>;
  FavoriteSubscription: Subscription;
  favoritesList: Favorite[];


  constructor(private favoriteStore: Store<FavoriteState>) {


    this.favorite$  = this.favoriteStore.pipe(select(selectAllFavorites));
    this.favoriteStore.dispatch(getFavoritesAction());

  }

  ngOnInit() {

    this.favoriteStore.dispatch(getFavoritesAction());
  }

  removeFavorite(selected: Favorite) {
    this.favoriteStore.dispatch(removeFavoritesAction({favorite: selected}));
  }

}
