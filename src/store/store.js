import { writable } from "svelte/store";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../lib/firebase/firebase";

export const authStore = writable({
  user: null,
  isLoading: true,
  data: {},
});

export const authHandlers = {
  signUp: async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
  },
  logIn: async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  },
  logOut: async () => {
    await signOut(auth);
  },
};
