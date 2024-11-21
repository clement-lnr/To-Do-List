import { useEffect, useState } from 'react';
import styles from './index.module.scss'

interface TaskItem {
  id: number;
  text: string;
  checked: boolean;
}

function App() {
  const [ toDoList, setToDoList ] = useState<TaskItem[]>([]);
  const [ newTask, setNewTask ] = useState('')

  const addTask = () => {
    setToDoList([...toDoList, { id: toDoList.length + 1, text: newTask, checked: false }])
  }

  const handleCheck = (id: number) => {
    const updatedList = toDoList.map(task =>
      task.id === id ? { ...task, checked: !task.checked } : task
    );
    setToDoList(updatedList);
  };

  useEffect(() => {
    console.log(toDoList)
  }, [toDoList])

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
              <input type="checkbox" onChange={() => handleCheck(item.id)} checked={item.checked} className={`${styles.checkinput}`}/>
              <a>{item.text}</a>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App
