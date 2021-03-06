
import { createAction, createReducer, on, Action, props, State, createFeatureSelector, createSelector } from '@ngrx/store';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';

// TODO: This could be improved by splitting the action/interfaces/states in different files
// since this is a demo, its better to be here for simplicity

export const adapter: EntityAdapter<Favorite> = createEntityAdapter<Favorite>();

export interface FavoriteState extends EntityState<Favorite> {

}

export const selectors = adapter.getSelectors();

export class Favorite {
    id: number;
    username: string;
}


// // Create the initialState
// export const initializeState =  () => {
//      return { favoriteList: Array<Favorite>() };
// };


// Create the actions for setting up and retrieving the list
// export const addFavoriteAction = createAction('[Favorite] Add Favorite', (payload: Favorite) => ({payload}));
export const addFavoriteAction = createAction('[Favorite] Add Favorite', props<{favorite: Favorite}>());
export const getFavoritesAction = createAction('[Favorite] Get Favorite');
export const removeFavoritesAction = createAction('[Favorite] Delete Favorite', props<{favorite: Favorite}>());

export const initialState = adapter.getInitialState();

// And finally, the reducer
const favoritesReducer = createReducer(initialState,
    on(getFavoritesAction, state => state),
    on(removeFavoritesAction, (state: FavoriteState, { favorite }: { favorite: Favorite }) => {
        return adapter.removeOne(favorite.id, state);
    }),
    on(addFavoriteAction, (state: FavoriteState, { favorite }: { favorite: Favorite }) => {
        return adapter.addOne(favorite, state);
})
);

const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = adapter.getSelectors();

  export const selectFavoritesState = createFeatureSelector('favorites');

export const selectAllFavorites = createSelector(selectFavoritesState, selectAll);


export function favoriteReducer(state: FavoriteState | undefined, action: Action) {
    return favoritesReducer(state, action);
}
