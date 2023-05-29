import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { authSlice } from "../auth/authReducer";
import { auth } from "../../firebase/config";
import { uploadAvatar } from "../../firebase/addAvatar";

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSignUpUser =
  ({ userEmail, password, nickname, avatar }) =>
  async (dispatch, getState) => {
    console.log('userEmail, password, nickname, avatar', userEmail, password, nickname, avatar)
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        password, 
      );

      const url =
      avatar && (await uploadAvatar(avatar, uid));


      await updateProfile(user, { displayName: nickname,  photoURL: url, });

      const { uid, displayName, email, photoURL } = user;

      dispatch(updateUserProfile({ id: uid, nickname: displayName, email, avatar: photoURL }));
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

export const authSignInUser =
  ({ userEmail, password }) =>
  async (dispatch, getState) => {
    try {
      await signInWithEmailAndPassword(auth, userEmail, password);
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authSignOut());
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
        const { uid, displayName, email, photoURL } = user;

        dispatch(updateUserProfile({ id: uid, nickname: displayName, email, avatar: photoURL }));
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
      const user = auth.currentUser; 
      const { uid } = user;
      const url = await uploadAvatar(photo, uid);

      await updateProfile(user, {
        photoURL: url,
      });
      
      const updatedUser = auth.currentUser; 
      
      const { photoURL } = updatedUser;
      
      dispatch(updateUserProfile({ avatar: photoURL }));
    }
  } catch (error) {
    console.log("error.message", error.message);
  }
};