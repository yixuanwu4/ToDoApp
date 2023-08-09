function TodoList ({list, remove})  {
  const showItem = (todo) => {
    console.log(todo.id)
    console.log(list);
    return (
      <div className='todo'>
        <li key={todo.id}> {todo.todo} </li>
        <button className='delete-button' onClick={() => {remove(todo)}}>Delete</button>
      </div>
    );
  };

  return (
    <>
      {list?.length > 0 ? (
        <ul className="todo-list">
          {list.map(showItem)}
        </ul>
      ) : (
        <div className = "empty">
          <p>Let's create some tasks!</p>
        </div>
      )}
    </>
  )
}

export default TodoList;