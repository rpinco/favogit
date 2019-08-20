
import { createAction, State, createReducer, on } from '@ngrx/store';

export const populateList = createAction('[Users] Populate list');

export const initialState = {
    usersList: []
};


const usersListReducer = createReducer(initialState,
    on(
        populateList, state => ({...usersList, state}
        )
    )
);


export function UsersListReducer () {
    
}