<script>
  export let todoList;
  export let i;

  export let editTodo
  export let deleteTodo
</script>

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
      <i class="fa-regular fa-pen-to-square cursor-pointer hover:text-blue-700"
      ></i>
    </button>
    <button on:click={() => deleteTodo(i)} on:keydown={() => {}}>
      <i class="fa-regular fa-trash-can cursor-pointer hover:text-blue-700"></i>
    </button>
  </div>
</div>
