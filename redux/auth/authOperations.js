import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { authSlice } from "../auth/authReducer";
import { auth } from "../../firebase/config";

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSignUpUser =
  ({ userEmail, password, nickname }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        password
      );
      await updateProfile(user, { displayName: nickname });

      const { uid, displayName, email } = user;

      dispatch(updateUserProfile({ id: uid, nickname: displayName, email }));
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

export const authSignInUser =
  ({ userEmail, password }) =>
  async (dispatch, getState) => {
    try {
       await signInWithEmailAndPassword(
        auth,
        userEmail,
        password
      );
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authSignOut())
  } catch (error) {
    console.log("error.message", error.message);
  }
};

export const authStateChanged = () => async (dispatch, getState) => {
    try {
      await onAuthStateChanged(auth, (user) => {
        auth.onAuthStateChanged((user) => {
          if (!user) {
            return;
          }
          const { uid, displayName, email } = user;
     
          dispatch(updateUserProfile({ id: uid, nickname: displayName, email }));
          dispatch(authStateChange({ stateChange: true }));
        });
      });
    } catch (error) {
        console.log("error.message", error.message);
    }
  };
  

  export const authAvatarChange = (photo) => async (dispatch, getState) => {
    try {

    if (photo) {
      await auth.updateProfile(user, {avatar: photo});
      dispatch(updateUserProfile({avatar: photo}))
    }
  
    } catch (error) {
        console.log("error.message", error.message);
    }
  }