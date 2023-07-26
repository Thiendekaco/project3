import { USER_ACTION_TYPES } from './user.types';
import { signInSuccess, signInFailed, signOutSuccess, signOutFailed, signUpSuccess, signUpFailed } from './user.action';
import { UserData } from '../../utils/firebase/firebase.utils';
import { AnyAction } from 'redux';

export type UserState = {
  readonly currentUser : UserData | null;
  readonly isLoading : boolean;
  readonly error : Error | null
}

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (
  state = INITIAL_STATE, 
  action: AnyAction): UserState => {

    if(signInSuccess.match(action)){
      return { ...state, currentUser: action.payload };
    }else if(signOutSuccess.match(action)){
      return { ...state, currentUser: null }
    }
    return state;
    //if(signOutFaildd.match(action) || signUp...){
      // return {...state, error : action.payload}
    }
