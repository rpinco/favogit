
import { createAction, State, createReducer, on, Action } from '@ngrx/store';
import { User } from '../users';

// TODO: This could be improved by splitting the action/interfaces/states in different files
// since this is a demo, its better to be here for simplicity

// create the interface for the users list state
export interface UserListState {
    userList: User[];
}

// Create the action for setting up the list
export const populateList = createAction('[Users] Populate list', (userList) => ( {userList}));

// Create the initialState
export const initialState: UserListState = {
    userList: []
};

// this is the pure function to use on the reducer
export function setUsersList(usersList: Array<User>, newUserList: Array<User> ) {
    return [...usersList, newUserList];
}


// And finally, the reducer
const usersListReducer = createReducer(initialState,
    on(populateList, (state, {userList}) => ({userList: userList}))
);


export function reducer(state: UserListState | undefined, action: Action) {
    return usersListReducer(state, action);
}
