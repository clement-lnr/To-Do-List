// App.tsx
import { useCallback, useMemo, useState } from 'react';
import useTasks from './hooks/useTasks';
import styles from './index.module.scss'
import settingIcon from './assets/dots.png';

function App() {
  const { toDoList, addTask, removeTask, handleCheck } = useTasks();

  const [taskName, setTaskName] = useState('');
  const [filter, setFilter] = useState('all');
  const [showTaskSettings, setShowTaskSettings] = useState(0);

  const currentDate = () => {
    const time = new Date();
    const weekday = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
    const yearmonth = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
    return `${weekday[time.getDay()]} ${time.getDate()} ${yearmonth[time.getMonth()]} ${time.getFullYear()}`;
  }

  const sendTaskName = useCallback(() => {
    if (taskName !== '') {
      addTask(taskName);
      setTaskName('');
    }
  }, [taskName, addTask]);

  const handleSettings = useCallback((id: number) => {
    console.log(showTaskSettings, id)
    id === showTaskSettings ? setShowTaskSettings(0) : setShowTaskSettings(id)
  }, [showTaskSettings]);

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
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.header}`}>
        <h1 className={`${styles.title}`}>Mes tâches</h1>
        <a className={`${styles.clock}`}>{currentDate()}</a>
        <div className={`${styles.todohandler}`}>
          <input type="text" placeholder='Nom de la tache...' value={taskName} onChange={(e) => setTaskName(e.target.value)} className={`${styles.addinput}`} onKeyDown={(e) => {e.key === 'Enter' && sendTaskName();}}/>
          <button onClick={() => sendTaskName()} className={`${styles.addbtn}`}>Ajouter la tache</button>
          <select onChange={(e) => setFilter(e.target.value)} value={filter} className={`${styles.filter}`}>
            <option value="all">Toutes</option>
            <option value="completed">Faits</option>
            <option value="uncompleted">En cours</option>
          </select>
        </div>
      </div>
      
      <div className={`${styles.todolist}`}>
        {
          filteredToDoList.map((item) => (
            <div className={`${styles.task}`} key={item.id}>
              <div className={`${styles.lefttaskitems}`}>
                <input type="checkbox" onChange={() => handleCheck(item.id)} checked={item.checked} className={`${styles.checkinput}`}/>
                <a>{item.text}</a>
              </div>
              <button onClick={() => handleSettings(item.id) } className={`${styles.showsettings}`}><img src={settingIcon} width={18} height={18} alt='settings'/></button>
              {
                showTaskSettings === item.id && (
                  <div className={`${styles.settingslist}`}>
                    <button onClick={() => removeTask(item.id)} className={`${styles.setting}`}>Supprimer</button>
                  </div>
                )
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App
