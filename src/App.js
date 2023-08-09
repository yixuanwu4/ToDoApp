import './App.css';
import {useState, useEffect} from "react";
import AddItem from "./AddItem.js"
import TodoList from './TodoList.js';

function App() {

  const [todos, setTodos] = useState([]);
  const [data, setData] = useState({ items: []});
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/items")
    .then((response) => response.json())
    .then((data) => {setData({ items: data});
    setTodos(data.map((item) => item.todo)); // Update todos state with the todo values from data
  });
  }, []);

  const addItemToData = (item) => {

    const requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    };
    fetch("http://localhost:3000/items", requestOption)
    .then((response) =>response.json()) 
    .then((data) => {
      setData((prevState) => ({
          items: Array.isArray(prevState.items) ? [...prevState.items, data] : [data],
      }));
    });
  };
  

  // const deleteTodo = (text) => {
  //   const newTodos = todos.filter((todo) => {
  //     return todo !== text;
  //   });
  //   setTodos(newTodos);
  // }

  const deleteItem = (item) => {
    console.log(item);
    const items = data["items"];
    const requestOptions = {
      method: "DELETE"
    }
    // console.log(items.indexOf(item));
    fetch(`http://localhost:3000/items/${item.id}`, requestOptions).then(
      
      (response) => {
        if (response.ok) {
          const idx = items.indexOf(item);
          
          items.splice(idx, 1);
          setData({ items: items});
        }
      }
    )
  }

  const target = Object.entries(data["items"]);
  console.log(target);

  const filterData = (data) => {
    const filteredData = [];

    if(!filters.todo) {
      return data;
    }

    for (const item of data){
      filteredData.push(item);
    }

    return filteredData;
  }

  
  return (
    <div className="App">

      <h1>React Todo App</h1>

      <AddItem addItem={addItemToData}/>

      <TodoList list = {filterData(data["items"])} remove={deleteItem} />
    </div>
  );
}

export default App;
