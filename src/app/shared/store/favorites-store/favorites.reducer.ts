
import { createAction, createReducer, on, Action, props } from '@ngrx/store';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';

// TODO: This could be improved by splitting the action/interfaces/states in different files
// since this is a demo, its better to be here for simplicity

export const adapter: EntityAdapter<Favorite> = createEntityAdapter<Favorite>();

export interface FavoriteState extends EntityState<Favorite> {

}

export class Favorite {
    username: string;
}


export class FavoriteState {
    favoriteList: Array<Favorite>;
}

// Create the initialState
export const initializeState =  () => {
     return { favoriteList: Array<Favorite>() };
};


// Create the actions for setting up and retrieving the list
export const addFavoriteAction = createAction('[Favorite] Add Favorite', (state: FavoriteState, payload: Favorite) => ({payload}));
export const getFavoritesAction = createAction('[Favorite] Get Favorite');
export const removeFavoritesAction = createAction('[Favorite] Delete Favorite', props<Favorite>());


export const initialState = initializeState();

// And finally, the reducer
const favoritesReducer = createReducer(initialState,
    on(getFavoritesAction, state => state),
    on(removeFavoritesAction, (state: FavoriteState, favorite: Favorite) => {
        return adapter.removeOne(favorite.username, state);
    }),
    on(addFavoriteAction, (state: FavoriteState, favorite: Favorite) => {
        return adapter.addOne(favorite, state);
    })
);


export function favoriteReducer(state: FavoriteState | undefined, action: Action) {
    return favoritesReducer(state, action);
}
