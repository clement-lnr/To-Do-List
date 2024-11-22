// App.tsx
import { useCallback, useMemo, useState } from 'react';
import useTasks from './hooks/useTasks';
import styles from './index.module.scss'

function App() {
  const { toDoList, addTask, removeTask, handleCheck } = useTasks();

  const [taskName, setTaskName] = useState('');
  const [filter, setFilter] = useState('all');

  const sendTaskName = useCallback(() => {
    if (taskName !== '') {
      addTask(taskName);
      setTaskName('');
    }
  }, [taskName, addTask]);

  const filteredToDoList = useMemo(() => {
    switch (filter) {
      case 'all':
        return toDoList;
      case 'completed':
        return toDoList.filter((task) => task.checked);
      case 'uncompleted':
        return toDoList.filter((task) => !task.checked);
      default:
        return toDoList;
    }
  }, [toDoList, filter]);

  return (
    <div>
      <h1 className={`${styles.title}`}>ToDo</h1>

      <div className={`${styles.todohandler}`}>
        <input type="text" placeholder='Nom de la tache...' value={taskName} onChange={(e) => setTaskName(e.target.value)} className={`${styles.addinput}`}/>
        <button onClick={() => sendTaskName()} className={`${styles.addbtn}`}>Ajouter la tache</button>
        <select onChange={(e) => setFilter(e.target.value)} value={filter} className={`${styles.select}`}>
          <option value="all">Toutes</option>
          <option value="completed">Faits</option>
          <option value="uncompleted">En cours</option>
        </select>
      </div>
      
      <div className={`${styles.todolist}`}>
        {
          filteredToDoList.map((item) => (
            <div className={`${styles.task}`} key={item.id}>
              <input type="checkbox" onChange={() => handleCheck(item.id)} checked={item.checked} className={`${styles.checkinput}`}/>
              <a>{item.text}</a>
              <button onClick={() => removeTask(item.id)}>Supprimer</button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App
