import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from 'src/app/shared/services/github.service';
import { FavoriteState, addFavoriteAction, Favorite } from 'src/app/shared/store/favorites-store/favorites.reducer';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  FavoriteSubscription: Subscription;
  profile: {};


  constructor(
    private route: ActivatedRoute, private gitHubService: GithubService, private favoriteStore: Store<FavoriteState>
  ) {
  }

  ngOnInit() {

    this.profile = this.route.paramMap.subscribe(params => {
      const username = params.get('username');

      this.gitHubService.getUser(username).subscribe(userData => {
        this.profile = userData;
      });
    });

  }

  addFavorite(username) {
    const newFavorite = new Favorite();
    newFavorite.username = username;

    this.favoriteStore.dispatch(addFavoriteAction(newFavorite));
  }

}
