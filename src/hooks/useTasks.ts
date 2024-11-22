import { useState } from "react";

interface TaskItem {
    id: number;
    text: string;
    checked: boolean;
}

export default function useTasks() {
    const [ toDoList, setToDoList ] = useState<TaskItem[]>([]);
    const [ taskTitle, setTaskTitle ] = useState('');
  
    const addTask = () => {
        if (taskTitle != '') {
            const newTask = {
                id: toDoList.length + 1,
                text: taskTitle,
                checked: false
            };
            setToDoList([...toDoList, newTask]);
        }
    }
  
    const handleCheck = (id: number) => {
      const updatedList = toDoList.map(task =>
        task.id === id ? { ...task, checked: !task.checked } : task
      );
      setToDoList(updatedList);
    };

    return { toDoList, setTaskTitle, addTask, handleCheck };
}