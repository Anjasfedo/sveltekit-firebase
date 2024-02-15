<script>
  let todoLists = ["Eating Geprek"];

  let currTodo = "";

  let err = false;

  const addTodo = () => {
    if (!currTodo) {
      err = true;
    }
    todoLists = [...todoLists, currTodo];

    currTodo = "";
  };

  const editTodo = (index) => {
    let editedTodo = todoLists.filter((val, i) => {
      return i !== index;
    });

    currTodo = todoLists[index];

    todoLists = editedTodo;
  };

  const deleteTodo = (index) => {
    let deletedTodo = todoLists.filter((val, i) => {
      return i !== index;
    });

    todoLists = deletedTodo;
  };
</script>

<div class="flex flex-col min-h-screen gap-4 p-4 w-full max-w-[1000px] mx-auto">
  <div class="flex items-center justify-between">
    <h1>Todo List</h1>
    <div class="flex items-center gap-4">
      <button
        class="hover:opacity-70 px-3 py-1 rounded-xl flex items-center gap-2"
        ><i class="fa-regular fa-floppy-disk"></i>
        <p>Save</p></button
      >
      <button
        class="hover:opacity-70 px-3 py-1 rounded-xl flex items-center gap-2"
        ><i class="fa-solid fa-right-from-bracket"></i>
        <p>Logout</p></button
      >
    </div>
  </div>
  <main class="flex flex-col gap-2 flex-1">
    {#if todoLists.length === 0}
      <p>You have nothin to do!</p>
    {:else}
      {#each todoLists as todoList, i}
        <div
          class="px-2 py-3 border-l-white border-l-2 flex items-center justify-between"
        >
          <p>{i + 1}. {todoList}</p>
          <div class="flex items-center gap-4 justify-center text-xl">
            <button
              on:click={() => {
                editTodo(i);
              }}
              on:keydown={() => {}}
            >
              <i
                class="fa-regular fa-pen-to-square cursor-pointer hover:text-blue-700"
              ></i>
            </button>
            <button on:click={() => deleteTodo(i)} on:keydown={() => {}}>
              <i
                class="fa-regular fa-trash-can cursor-pointer hover:text-blue-700"
              ></i>
            </button>
          </div>
        </div>
      {/each}
    {/if}
  </main>
  <div
    class={"flex items-center border-solid border-2 border-white rounded-md " +
      (err ? " border-red-700" : " ")}
  >
    <input
      type="text"
      placeholder="Enter Todo"
      class="bg-transparent bg-none focus:border-none focus-within:outline-none p-2 text-white flex-1"
      bind:value={currTodo}
    />
    <button
      class="px-4 py-2 bg-slate-300 border-none font-bold cursor-pointer hover:bg-transparent"
      on:click={addTodo}>Add</button
    >
  </div>
</div>
