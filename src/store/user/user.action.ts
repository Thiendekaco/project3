import { USER_ACTION_TYPES } from './user.types';
import { createAction, withMatcher } from '../../utils/reducer/reducer.utils';
import { UserData, AdditionalInformation } from '../../utils/firebase/firebase.utils';
import { Action, ActionWithPayLoad } from '../../utils/reducer/reducer.utils';
import { User } from 'firebase/auth';
/*
CHECK_USER_SESSION: 'user/CHECK_USER_SESSION',
  GOOGLE_SIGN_IN_START: 'user/GOOGLE_SIGN_IN_START',
  EMAIL_SIGN_IN_START: 'user/EMAIL_SIGN_IN_START',
  SIGN_IN_SUCCESS: 'user/SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE: 'user/SIGN_IN_FAILURE'

*/

export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>

export const checkUserSession = withMatcher(
  ():CheckUserSession =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)
  );

export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>

export const googleSignInStart = withMatcher(
  (): GoogleSignInStart =>
  createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START)
)

export type EmailSignInStart = ActionWithPayLoad<USER_ACTION_TYPES, {email: string, password: string}>

export const emailSignInStart = withMatcher(
  (email: string , password: string): EmailSignInStart =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password })
)

export type  signInSuccess = ActionWithPayLoad<USER_ACTION_TYPES.SIGN_IN_SUCCESS, UserData>
export const signInSuccess =withMatcher( 
  (user: UserData & {id : string}) :signInSuccess=>
  createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user)
)

export const signInFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);

export type SignUpStart = ActionWithPayLoad<USER_ACTION_TYPES.SIGN_UP_START, {email : string, password: string, displayName: string}>;

export const signUpStart = withMatcher(
  (email: string, password: string, displayName: string): SignUpStart =>
  createAction(USER_ACTION_TYPES.SIGN_UP_START, {
    email,
    password,
    displayName,
  })
)
export type SignUpSuccess = ActionWithPayLoad<USER_ACTION_TYPES.SIGN_UP_SUCCESS, {user : User, additionalDetails: AdditionalInformation}>
export const signUpSuccess = withMatcher(
  (user: User, additionalDetails: AdditionalInformation): SignUpSuccess =>
  createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails })
)
export const signUpFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error);

export const signOutStart = () =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_START);

export type SignOutSucces = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>  
export const signOutSuccess = withMatcher(
  () =>
    createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS)
)
export const signOutFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error);
