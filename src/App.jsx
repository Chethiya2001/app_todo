import { useState } from 'react'
import './style.css'

function App() {
  
  const [newItem, setNewItem] = useState("");
  const [todo, setTodo] = useState([])

  function handlesubmit (e) {
    e.preventDefault();

    setTodo(currentTodos => {
      return [
        ...currentTodos,
        {id:crypto.randomUUID(), title:newItem, completed:false},
      ]
    })
    setNewItem("")
    
  }
  function toggleTodo(id, completed){
      setTodo(currentTodos => {
        return currentTodos.map(todo => {
          if (todo.id === id) {
            return {...todo, completed}
          }
          return todo
        })
      })
  }

  function deleteTodo(id) {
    setTodo(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }
  return (
    <>
    <form onSubmit={handlesubmit} className='new-item-form'>
    <div className='form-row'>
      <label htmlFor='item'>New Item</label>
      <input value={newItem} onChange={ (e) => setNewItem(e.target.value)} type='text' id='item'/>
    </div>
    <button className='btn'>Add</button>

    </form>
    <h1 className='header'>Todo List</h1>

    <ul className='list'>
    {todo.length === 0 && "No todos"}
    {todo.map(todo => {
      return  (
        <li key={todo.id}>
        <label>
          <input type='checkbox' checked={todo.completed} onChange={e=> toggleTodo(todo.id, e.target.value)}/>
          {todo.title}
        </label>
        <button onClick={()=> deleteTodo(todo.id)} className='btn btn-danger'>Delete</button>
      </li>)
    })}
     
    </ul>
    </>
    
  )
}

export default App
