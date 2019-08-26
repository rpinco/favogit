import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FavoriteState, getFavoritesAction, Favorite, selectAll } from 'src/app/shared/store/favorites-store/favorites.reducer';
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

    // const favList = selectors.selectAll(this.favoriteStore);
    //const  favlist  = this.favoriteStore.pipe(select(selectors.selectAll));
    //console.log(favlist);
    this.favorite$ = this.favoriteStore.pipe(select(selectAll));

  }

  ngOnInit() {

    // this.favorite$.subscribe(
    //   response => {
    //     this.favoritesList = response.favoriteList;
    //   }
    // );

    this.favoriteStore.dispatch(getFavoritesAction());
  }

}
