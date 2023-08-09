import { useState } from "react";

function AddItem(props) {

  const [todo, setTodo] = useState("");

  const addTodo = () => {
    if (todo !== "") {
      // setTodos([...todos, todo]);
      props.addItem({todo: todo});
      setTodo("");
    }
  };

  const handleKeyPress = e => {
    if (e.keyCode === 13) {
      addTodo();
    }
  }
  return (
    <div className = "input-wrapper">
      <input type="text" name="todo" placeholder='Create your new task!  :)' value={todo} onChange={(e) => setTodo(e.target.value)} onKeyDown={handleKeyPress} />
      <button className='add-button' onClick={addTodo}>Add</button>
    </div>
  )
  
}

export default AddItem;