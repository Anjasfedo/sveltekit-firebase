<script>
  import { onMount } from "svelte";
  import "../app.css";
  import { auth, db } from "../lib/firebase/firebase";
  import { doc, getDoc, setDoc } from "firebase/firestore";
  import { authStore } from "../store/store";

  const nonAuthRoutes = ["/"];

  onMount(() => {
    // console.log("Mount");
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      const currentPath = window.location.pathname;

      if (!user && !nonAuthRoutes.includes(currentPath)) {
        window.location.href = "/";
        return;
      }

      if (user && currentPath == "/") {
        window.location.href = "/dashboard";
        return;
      }

      if (!user) {
        return;
      }

      let dataToSetStore;

      const docRef = doc(db, "user", user.uid);

      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        const userRef = doc(db, "user", user.uid);

        dataToSetStore = {
          email: user.email,
          data: { todos: [] },
        };

        await setDoc(userRef, dataToSetStore, { merge: true });
      } else {
        const userData = docSnap.data();

        dataToSetStore = userData;
      }

      authStore.update((curr) => {
        return {
          ...curr,
          user,
          data: dataToSetStore.data,
          isLoading: false,
        };
      });
    });

    return unsubscribe;
  });
</script>

<div
  class="min-h-screen bg-gradient-to-tr from-zinc-700 to-sky-950 text-white relative flex flex-col duration-200"
>
  <slot />
</div>
