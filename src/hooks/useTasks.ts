import { useState } from "react";

interface TaskItem {
    id: number;
    text: string;
    checked: boolean;
}

export default function useTasks() {
    const [ toDoList, setToDoList ] = useState<TaskItem[]>([]);
    const [ newTask, setNewTask ] = useState('')
  
    const addTask = () => {
      newTask && setToDoList([...toDoList, { id: toDoList.length + 1, text: newTask, checked: false }])
    }
  
    const handleCheck = (id: number) => {
      const updatedList = toDoList.map(task =>
        task.id === id ? { ...task, checked: !task.checked } : task
      );
      setToDoList(updatedList);
    };

    return { toDoList, setNewTask, addTask, handleCheck };
}