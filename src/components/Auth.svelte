<script>
  import { authHandlers } from "../store/store";

  let email = "";
  let password = "";
  let confirmPassword = "";

  let register = false;
  let err = false;

  let isAuthenticating = false;

  const handleAuth = async () => {
    if (isAuthenticating) {
      return;
    }

    if (!email || !password || (register && !confirmPassword)) {
      err = true;
      return;
    }

    isAuthenticating = true;

    try {
      if (!register) {
        await authHandlers.logIn(email, password);
      } else {
        await authHandlers.signUp(email, password);
      }
    } catch (error) {
      console.log("There is an auth error", error);
      err = true;
      isAuthenticating = false;
    }
  };

  const handleRegister = () => {
    register = !register;
  };
</script>

<div class="flex flex-col items-center justify-center flex-1 p-1">
  <form class="flex flex-col gap-6 max-w-full w-[400px] mx-auto">
    <h1 class="text-center text-5xl font-bold p-2">
      {register ? "Register" : "Login"}
    </h1>
    {#if err}
      <p class="text-red font-bold text-center text-red-700">Input incorrect</p>
    {/if}
    <label
      for=""
      class="relative border-solid border-2 border-lime-300 rounded-lg focus-within:border-lime-100"
    >
      <p
        class="
  absolute -translate-y-[50%] pointer-events-none text-white rounded-sm font-light duration-500
  {email
          ? 'top-0 left-[24px] border-[1px] border-solid border-lime-300 bg-slate-900 rounded-lg px-1'
          : 'top-[50%] left-[4px] border-2 border-solid border-transparent opacity-0'}
"
      >
        Email
      </p>

      <input
        class="w-full border-none bg-transparent text-white focus:border-none focus:outline-none px-2 py-4"
        type="email"
        placeholder="Email"
        bind:value={email}
      /></label
    >
    <label
      for=""
      class="relative border-solid border-2 border-lime-300 rounded-lg focus-within:border-lime-100"
    >
      <p
        class="
      absolute -translate-y-[50%] pointer-events-none text-white rounded-sm font-light duration-500
      {password
          ? 'top-0 left-[24px] border-[1px] border-solid border-lime-300 bg-slate-900 rounded-lg px-1'
          : 'top-[50%] left-[4px] border-2 border-solid border-transparent opacity-0'}
    "
      >
        Password
      </p>
      <input
        class="w-full border-none bg-transparent text-white focus:border-none focus:outline-none px-2 py-4"
        type="password"
        placeholder="Password"
        bind:value={password}
      /></label
    >
    {#if register}
      <label
        for=""
        class="relative border-solid border-2 border-lime-300 rounded-lg focus-within:border-lime-100"
      >
        <p
          class="
absolute -translate-y-[50%] pointer-events-none text-white rounded-sm font-light duration-500
{confirmPassword
            ? 'top-0 left-[24px] border-[1px] border-solid border-lime-300 bg-slate-900 rounded-lg px-1'
            : 'top-[50%] left-[4px] border-2 border-solid border-transparent opacity-0'}
"
        >
          ConfirmPassword
        </p>
        <input
          class="w-full border-none bg-transparent text-white focus:border-none focus:outline-none px-2 py-4"
          type="password"
          placeholder="Confirm Password"
          bind:value={confirmPassword}
        /></label
      >
    {/if}
    <button
      type="button"
      class="bg-lime-400 text-white border-none px-3 py-2 cursor-pointer rounded-md hover:bg-lime-600 duration-500 grid place-items-center"
      on:click={handleAuth}
      >{#if isAuthenticating}
        <i class="fa-solid fa-spinner animate-spin"></i>
      {:else}
        Submit
      {/if}</button
    >
  </form>
  <div class="p-2">
    <p class="text-center">Or</p>
    {#if register}
      <div class="flex items-center gap-2">
        <p class="">Already have an account?</p>
        <button
          class="text-green-600 cursor-pointer"
          on:click={handleRegister}
          on:keydown={() => {}}
        >
          Login
        </button>
      </div>
    {:else}
      <div class="flex items-center gap-2">
        <p>Don't have an account?</p>
        <button
          class="text-green-600 cursor-pointer"
          on:click={handleRegister}
          on:keydown={() => {}}
        >
          Register
        </button>
      </div>
    {/if}
  </div>
</div>
