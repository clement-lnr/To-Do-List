import useTasks from './hooks/useTasks';
import styles from './index.module.scss'

function App() {
  const { toDoList, setTaskTitle, addTask, handleCheck } = useTasks();

  return (
    <div>
      <h1 className={`${styles.title}`}>ToDo</h1>

      <div className={`${styles.todohandler}`}>
        <input type="text" placeholder='Nom de la tache...' onChange={(e) => setTaskTitle(e.target.value)} className={`${styles.addinput}`}/>
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
