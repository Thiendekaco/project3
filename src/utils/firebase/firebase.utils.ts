import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { Category } from '../../store/categories/category.types';
import { useCallback } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyAURDXg92oTkhNwCTAh8ytpt9Dm5dbOSGo",
  authDomain: "crwn-clothing-123-1b021.firebaseapp.com",
  projectId: "crwn-clothing-123-1b021",
  storageBucket: "crwn-clothing-123-1b021.appspot.com",
  messagingSenderId: "101931526624",
  appId: "1:101931526624:web:969682f14b1809c5736385"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export type ObjectToAdd = {
  title : string;
}

export const addCollectionAndDocuments = async <T extends ObjectToAdd> (
  collectionKey: string,
  objectsToAdd: T[]
) : Promise<void>=> {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Category);
};
export type AdditionalInformation = {
  displayName ?: string;
}

export type UserData = {
  createdAt : Date;
  displayName : string;
  email : string;
}

export const createUserDocumentFromAuth = async (
  userAuth : User,
  additionalInformation? : AdditionalInformation
):Promise<QueryDocumentSnapshot<UserData> | void> => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
 
    const { email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error : any) {
      console.log('error creating the user', error.message);
    }
  }

  return userSnapshot as QueryDocumentSnapshot<UserData> ;
};

export const createAuthUserWithEmailAndPassword = async (email: string, password:string) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListner = (callback: NextOrObserver<User>) =>{
  onAuthStateChanged(auth, callback)
}


export const getCurrentUser = (): Promise<User> => {//Kiểm tra xem đăng nhập của user
  return new Promise((resolve, reject) => {
    onAuthStateChanged(
      auth,
      (userAuth) => {
        resolve(userAuth as User);//tra ra userAuth
      },
      reject
    );
  });
};
