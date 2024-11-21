import { useState } from 'react';
import styles from './index.module.scss'

function App() {
  const [toDoList, setToDoList] = useState([{}]);
  const [ newTask, setNewTask ] = useState('')

  const addTask = () => {
    setToDoList([...toDoList, { id: toDoList.length + 1, text: newTask, checked: false }])
  }

  return (
    <div>
      <h1 className={`${styles.title}`}>ToDo</h1>

      <div className={`${styles.todohandler}`}>
        <input type="text" placeholder='Nom de la tache...' onChange={(e) => setNewTask(e.target.value)} className={`${styles.addinput}`}/>
        <button onClick={() => addTask()} className={`${styles.addbtn}`}>Ajouter la tache</button>
      </div>
      
      <div className={`${styles.todolist}`}>
        {
          toDoList.map((item) => (
            <div className={`${styles.task}`} key={item.id}>
              <a>{item.text}</a>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App
