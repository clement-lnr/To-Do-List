import { useState } from 'react';
import styles from './index.module.scss'

function App() {
  const [toDoList, setToDoList] = useState([{}]);
  const [ newTask, setNewTask ] = useState('')

  const addTask = () => {
    setToDoList([...toDoList, { id: toDoList.length + 1, text: newTask, checked: false }])
  }

  return (
    <>
      <h1 className={`${styles.title}`}>ToDo</h1>
      <input type="text" onChange={(e) => setNewTask(e.target.value)}/>
      <button onClick={() => addTask()}>Add</button>
      
      {
        toDoList.map((item) => (
          <a>{item.text}</a>
        ))
      }
    </>
  )
}

export default App
